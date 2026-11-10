import piala from '../../../assets/soup-piala.png'
import recipe from '../../../assets/soup-recipe.png'
import ladle from '../../../assets/soup-ladle.png'

const sources = { piala, recipe, ladle }

/** Decorative brand art; the surrounding heading supplies the state and meaning. */
export function SoupArt({ kind, animateSteam = false }: { kind: keyof typeof sources; animateSteam?: boolean }) {
  const steaming = kind === 'piala' && animateSteam
  return (
    <span className={`soup-art soup-art-${kind}${steaming ? ' soup-art-steaming' : ''}`} aria-hidden="true" data-soup-art={kind}>
      <img className={steaming ? 'soup-art-body' : undefined} src={sources[kind]} alt="" width={1254} height={1254} decoding="async" draggable={false} />
      {steaming && <img className="soup-art-steam" src={piala} alt="" width={1254} height={1254} decoding="async" draggable={false} />}
    </span>
  )
}
