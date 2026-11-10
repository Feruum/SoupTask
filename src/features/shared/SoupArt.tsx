import piala from '../../../assets/ui/soup-piala-128.png'
import piala2x from '../../../assets/ui/soup-piala-256.png'
import piala4x from '../../../assets/ui/soup-piala-512.png'
import recipe from '../../../assets/ui/soup-recipe-128.png'
import recipe2x from '../../../assets/ui/soup-recipe-256.png'
import recipe4x from '../../../assets/ui/soup-recipe-512.png'
import ladle from '../../../assets/ui/soup-ladle-128.png'
import ladle2x from '../../../assets/ui/soup-ladle-256.png'
import ladle4x from '../../../assets/ui/soup-ladle-512.png'

const sources = {
  piala: {src:piala,srcSet:`${piala} 1x, ${piala2x} 2x, ${piala4x} 4x`},
  recipe: {src:recipe,srcSet:`${recipe} 1x, ${recipe2x} 2x, ${recipe4x} 4x`},
  ladle: {src:ladle,srcSet:`${ladle} 1x, ${ladle2x} 2x, ${ladle4x} 4x`}
}

/** Decorative brand art; the surrounding heading supplies the state and meaning. */
export function SoupArt({ kind, animateSteam = false }: { kind: keyof typeof sources; animateSteam?: boolean }) {
  const steaming = kind === 'piala' && animateSteam
  const image = sources[kind]
  return (
    <span className={`soup-art soup-art-${kind}${steaming ? ' soup-art-steaming' : ''}`} aria-hidden="true" data-soup-art={kind}>
      <img className={steaming ? 'soup-art-body' : undefined} src={image.src} srcSet={image.srcSet} alt="" width={128} height={128} decoding="async" draggable={false} />
      {steaming && <img className="soup-art-steam" src={image.src} srcSet={image.srcSet} alt="" width={128} height={128} decoding="async" draggable={false} />}
    </span>
  )
}
