"""Render the factual submission note as a two-page Soup PDF."""
from pathlib import Path
import re
from tempfile import NamedTemporaryFile
from xml.sax.saxutils import escape

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

source = Path('docs/submission-note.md')
output = Path('output/pdf/soup-submission-note.pdf')
output.parent.mkdir(parents=True, exist_ok=True)
assets = Path('assets/readme')
margin = 19 * mm
content_width = A4[0] - 2 * margin - 12

ink = colors.HexColor('#29221c')
paper = colors.HexColor('#fcf8f2')
rule = colors.HexColor('#d8c8b9')
orange = colors.HexColor('#b44f2b')
sand = colors.HexColor('#e8dfd0')

body = ParagraphStyle('Body', fontName='Helvetica', fontSize=10.3, leading=13.5, textColor=ink, spaceAfter=8)
heading = ParagraphStyle('Heading', parent=body, fontName='Helvetica-Bold', fontSize=14, leading=18, spaceAfter=0)
caption = ParagraphStyle('Caption', parent=body, fontSize=9.3, leading=13, spaceAfter=0)

section_icons = {
    'Product and truthful data': 'data',
    'Research applied to Soup': 'layers',
    'Verification': 'check',
    'Performance and limits': 'chart',
    'Memory findings': 'monitor',
    'AI assistance and handoff': 'recipe',
}


def rich(text):
    text = escape(text.replace('\n', ' '))
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'`([^`]+)`', r'<font name="Courier">\1</font>', text)
    return re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'<link href="\2" color="#9f4529">\1</link>', text)


def metric_table(markdown):
    rows = [line.strip('|').split('|') for line in markdown.splitlines()]
    cell_style = ParagraphStyle('Metric cell', parent=body, fontSize=9, leading=12, spaceAfter=0)
    number_style = ParagraphStyle('Metric number', parent=cell_style, alignment=TA_RIGHT)
    header_style = ParagraphStyle('Metric header', parent=cell_style, fontName='Helvetica-Bold')
    numeric_header = ParagraphStyle('Metric numeric header', parent=header_style, alignment=TA_RIGHT)
    cells = [[
        Paragraph(rich(cell.strip()), header_style if column == 0 else numeric_header)
        for column, cell in enumerate(rows[0])
    ]]
    for row in rows[2:]:
        cells.append([
            Paragraph(rich(cell.strip()), cell_style if column == 0 else number_style)
            for column, cell in enumerate(row)
        ])

    widths = ['32%', '13%', '18.5%', '18.5%', '18%'] if len(rows[0]) == 5 else ['40%', '30%', '30%']
    table = Table(cells, colWidths=widths, repeatRows=1, hAlign='LEFT', spaceAfter=8)
    table.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f3eee6')]),
        ('BACKGROUND', (0, 0), (-1, 0), sand),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, rule),
        ('LINEBELOW', (0, -1), (-1, -1), 0.5, rule),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    return table


def section_heading(title):
    icon = Image(str(assets / 'soup-icons' / f'soup-{section_icons[title]}.png'), width=23, height=23)
    return Table([[icon, Paragraph(rich(title), heading)]],
                 colWidths=[30, content_width - 30], hAlign='LEFT', spaceBefore=4, spaceAfter=5,
                 style=[('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                        ('LEFTPADDING', (0, 0), (-1, -1), 0),
                        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                        ('TOPPADDING', (0, 0), (-1, -1), 0),
                        ('BOTTOMPADDING', (0, 0), (-1, -1), 0)])


def compare_preview():
    screenshot = Image(str(assets / 'compare.png'), width=197, height=197 * 900 / 1440)
    copy = [
        '**Compare in the app**',
        'Four runs share one cursor. The source table shows the recorded step, all three original metrics and the row to pin.',
        '[Open the full screenshot](https://github.com/Feruum/SoupTask/blob/main/assets/readme/compare.png)',
    ]
    text = Paragraph('<br/><br/>'.join(rich(part) for part in copy), caption)
    return Table([[screenshot, text]], colWidths=[217, content_width - 217],
                 hAlign='LEFT', spaceBefore=2, spaceAfter=8,
                 style=[('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#ede6d9')),
                        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                        ('LEFTPADDING', (0, 0), (-1, -1), 10),
                        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
                        ('TOPPADDING', (0, 0), (-1, -1), 8),
                        ('BOTTOMPADDING', (0, 0), (-1, -1), 8)])


story = []
title = 'Soup Training Monitor'
for paragraph in source.read_text(encoding='utf-8').split('\n\n'):
    paragraph = paragraph.strip()
    if not paragraph:
        continue
    if paragraph == '<!-- pagebreak -->':
        story.append(PageBreak())
    elif paragraph.startswith('# '):
        title = paragraph[2:]
        story.extend([Image(str(assets / 'soup-cover.png'), width=content_width,
                            height=content_width / 3, hAlign='LEFT'), Spacer(1, 9)])
    elif paragraph.startswith('## '):
        story.append(section_heading(paragraph[3:]))
    elif paragraph.startswith('|'):
        story.append(metric_table(paragraph))
    elif paragraph.startswith('![') and paragraph.endswith('../assets/readme/compare.png)'):
        story.append(compare_preview())
    else:
        story.append(Paragraph(rich(paragraph), body))


def decorate_page(canvas, document):
    width, height = A4
    edge = margin + 6
    canvas.saveState()
    canvas.setFillColor(paper)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFont('Helvetica-Bold', 8)
    canvas.setFillColor(orange)
    canvas.drawString(edge, height - 12 * mm, 'SOUP TRAINING MONITOR')
    canvas.drawRightString(width - edge, height - 12 * mm, 'TECHNICAL SUBMISSION')
    canvas.restoreState()


# Create the candidate beside the output so it inherits the output folder's
# permissions on Windows before it replaces the published file.
with NamedTemporaryFile(dir=output.parent, suffix='.pdf', delete=False) as temporary_file:
    candidate = Path(temporary_file.name)
try:
    document = SimpleDocTemplate(str(candidate), pagesize=A4, rightMargin=margin, leftMargin=margin,
                                 topMargin=18 * mm, bottomMargin=20 * mm, title=f'{title} - submission note',
                                 author='Soup project - AI-assisted implementation')
    document.build(story, onFirstPage=decorate_page, onLaterPages=decorate_page)
    reader = PdfReader(candidate)
    assert len(reader.pages) == 2, f'Expected exactly two pages, got {len(reader.pages)}'
    assert all(page.extract_text().strip() for page in reader.pages), 'A PDF page has no text'
    candidate.replace(output)
finally:
    candidate.unlink(missing_ok=True)
print(f'Created {output}: exactly 2 pages with extractable text')
