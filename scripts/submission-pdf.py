"""Render the final factual Markdown note into a verified two-page PDF."""
from pathlib import Path
import re
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from pypdf import PdfReader

source = Path('docs/submission-note.md')
output = Path('output/pdf/soup-submission-note.pdf')
output.parent.mkdir(parents=True, exist_ok=True)
styles = {
    'body': ParagraphStyle('Body', fontName='Helvetica', fontSize=10.3, leading=14.3, textColor=colors.HexColor('#29221c'), spaceAfter=10, alignment=TA_LEFT),
    'title': ParagraphStyle('Title', fontName='Helvetica-Bold', fontSize=23, leading=27, textColor=colors.HexColor('#9f4529'), spaceAfter=17),
    'heading': ParagraphStyle('Heading', fontName='Helvetica-Bold', fontSize=12.5, leading=17, textColor=colors.HexColor('#533c2e'), spaceBefore=8, spaceAfter=8),
}

def rich(text):
    text = escape(text.replace('\n', ' '))
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'`([^`]+)`', r'<font name="Courier">\1</font>', text)
    text = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'<link href="\2" color="#9f4529">\1</link>', text)
    return text

story = []
for paragraph in source.read_text(encoding='utf-8').split('\n\n'):
    paragraph = paragraph.strip()
    if not paragraph:
        continue
    if paragraph == '<!-- pagebreak -->':
        story.append(PageBreak())
    elif paragraph.startswith('# '):
        story.append(Paragraph(rich(paragraph[2:]), styles['title']))
    elif paragraph.startswith('## '):
        story.append(Paragraph(rich(paragraph[3:]), styles['heading']))
    else:
        story.append(Paragraph(rich(paragraph), styles['body']))

def footer(canvas, document):
    canvas.setStrokeColor(colors.HexColor('#d3c9bf'))
    canvas.line(19*mm, 17*mm, A4[0]-19*mm, 17*mm)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#685c52'))
    canvas.drawString(19*mm, 12*mm, 'SOUP  /  FRONTEND ENGINEERING  /  DEMONSTRATION SNAPSHOTS')
    canvas.drawRightString(A4[0]-19*mm, 12*mm, f'{document.page} / 2')

document = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=19*mm, leftMargin=19*mm, topMargin=19*mm, bottomMargin=23*mm, title='Soup Training Monitor - submission note', author='Soup project - AI-assisted implementation')
document.build(story, onFirstPage=footer, onLaterPages=footer)
reader = PdfReader(output)
assert len(reader.pages) == 2, f'Expected exactly two pages, got {len(reader.pages)}'
assert all(page.extract_text().strip() for page in reader.pages), 'A PDF page has no text'
print(f'Created {output}: exactly 2 pages with extractable text')
