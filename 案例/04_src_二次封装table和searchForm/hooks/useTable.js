import { computed, reactive, toRefs } from 'vue'

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Object} pageParamKeyMap 获取分页参数键名映射 (非必传，默认为{pageNum:page, pageSize:rows})
 * @param {Boolean} isPageable 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * @param {Function} requestError 对后台返回的数据进行错误处理的方法 (非必传)
 */
const useTable = (
  api,
  initParam = {},
  pageParamKeyMap = {},
  isPageable = true,
  dataCallBack = null,
  requestError = null
) => {
  const state = reactive({
    /* 表格数据 */
    tableData: [],
    /* 分页数据 */
    pageable: {
      /* 当前页数 */
      pageNum: 1,
      /* 当前页数 */
      pageSize: 10,
      /* 总条数 */
      total: 0,
    },
    /* 查询参数(只包括查询) */
    searchParam: {},
    /* 初始化默认的查询参数 */
    searchInitParam: {},
    /* 总参数(包含分页和查询参数) */
    totalParam: {},
  })

  /* 分页查询参数 */
  const pageParam = computed({
    get: () => {
      return {
        [pageParamKeyMap.pageNum]: state.pageable.pageNum,
        [pageParamKeyMap.pageSize]: state.pageable.pageSize,
      }
    },
    set: (newVal) => {
      console.log('分页更新之后的值', newVal)
    },
  })

  /* 更新分页信息 */
  const updatePageable = (pageable) => {
    const copyPageable = { ...pageable }
    ;['pageNum', 'pageSize', 'total'].forEach((key) => {
      if (pageable[key]) copyPageable[key] = Number(pageable[key])
    })
    Object.assign(state.pageable, copyPageable)
  }

  /* 获取表格数据 */
  const getTableList = async () => {
    if (!api) return
    try {
      Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {})
      let data = await api({ ...state.searchInitParam, ...state.totalParam })
      console.log('getTableList data: ', data)

      if (dataCallBack) data = dataCallBack(data)
      state.tableData = isPageable ? data.list : data
      /* 解构后台返回的分页数据 (如果有分页更新分页信息) */
      if (isPageable) {
        const { pageNum, pageSize, total } = data
        updatePageable({ pageNum, pageSize, total })
      }
    } catch (err) {
      if (requestError) requestError(err)
    }
  }

  /* 每页条数改变 */
  const handleSizeChange = (val) => {
    state.pageable.pageNum = 1
    state.pageable.pageSize = val
    getTableList()
  }

  /* 当前页改变 */
  const handleCurrentChange = (val) => {
    state.pageable.pageNum = val
    getTableList()
  }

  /* 更新查询参数 */
  const updatedTotalParam = () => {
    state.totalParam = {}
    /* 处理查询参数，可以给查询参数加自定义前缀操作 */
    let nowSearchParam = {}
    /* 防止手动清空输入框携带参数（这里可以自定义查询参数前缀） */
    for (let key in state.searchParam) {
      /* 某些情况下参数为 false/0 也应该携带参数 */
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {})
  }

  /* 表格数据查询 */
  const search = () => {
    state.pageable.pageNum = 1
    updatedTotalParam()
    getTableList()
  }

  /* 表格数据重置 */
  const reset = () => {
    state.pageable.pageNum = 1
    state.searchParam = {}
    /* 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数 */
    Object.keys(state.searchInitParam).forEach(key => {
      state.searchParam[key] = state.searchInitParam[key]
    })
    updatedTotalParam()
    getTableList()
  }

  return {
    ...toRefs(state),
    search,
    reset,
    getTableList,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam,
  }
}

export default useTable
