import { Product } from '../../services/product'
import ProgressiveImage from '../global/ProgressiveImage'
import { toCurrency } from '../../utils/currency'

export default function CaroselCard(props: Product) {
  return (
    <div>
      <ProgressiveImage src={props.images[0]} alt={props.title} />
      <div className="pt-5 pr-4">
        <h2 className="text-black font-medium text-base leading-6">
          {props.title}
        </h2>
        <h3 className="text-grey text-base leading-6 my-[2px]">
          {props.category.name}
        </h3>
        <h4 className="text-black text-base leading-6">
          {toCurrency(props.price)}
        </h4>
      </div>
    </div>
  )
}
