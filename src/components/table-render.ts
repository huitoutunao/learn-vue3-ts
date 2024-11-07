import { h } from 'vue'

const TableRender = (props: any) => {
  const params = {
    row: props.row,
    column: props.column,
    index: props.index
  }

  return props.render(h, params)
}

TableRender.props = {
  row: Object,
  column: Object,
  index: Number,
  render: Function,
}

export default TableRender
