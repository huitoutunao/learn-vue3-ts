import { h } from 'vue'

/**
 * @description render 函数式组件
 * @param {Function} render 渲染函数 (必传)
 * @param {Object} scope 作用域参数 (非必传，默认为{})
 */
const RenderComponent = (props) => {
  console.log('RenderComponent', props)
  const scope = props.scope ?? {}
  return props.render(h, scope)
}

export default RenderComponent
