// import { getProvince } from '@/api/system'

export function useSimpleRequest() {
  function simpleRequest(opt) {
    opt.requestFun(opt.requestObj).then((res) => {
      const resArray = Array.isArray(res.result)
        ? res.result.map((item) => {
            return {
              ...item,
              label: item[opt.labelString],
              value: item[opt.valueString].toString(),
            }
          })
        : []
      // isForm 用于生成一个数据List
      if (!opt.isForm) {
        resArray.unshift({
          value: '',
          label: '全部',
          childCode: opt.requestObj.childCode || undefined,
        })
        opt.tableList.value = resArray
      } else {
        opt.formList.value = resArray
      }
      // isComplete用于生成多个数据List
      if (opt.isComplete == true) {
        opt.formList.value = resArray
        opt.tableList.value = [
          {
            value: '',
            label: '全部',
          },
        ].concat(...resArray)
      }
    })
  }

  function clearFormOrPageInput(opt) {
    // const clearFormOrPage =
    //   opt.childCode == 'DQ' ? opt.requestObj : opt.formState
    // const clearList = opt.childCode == 'DQ' ? opt.pageList : opt.formList
    const clearFormOrPage = opt.isForm ? opt.formState : opt.requestObj
    const clearList = opt.isForm ? opt.formList : opt.pageList
    switch (opt.label) {
      case '3':
        clearFormOrPage.cityCode = undefined
        clearFormOrPage.districtCode = undefined
        clearFormOrPage.streetCode = undefined
        if (opt.isForm) {
          clearList.cityList.value = []
          clearList.streetList.value = []
          clearList.districtList.value = []
        } else {
          clearList.cityList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
          clearList.streetList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
          clearList.districtList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
        }

        break
      case 'p3':
        clearFormOrPage.poCityCode = undefined
        clearFormOrPage.poDistrictCode = undefined
        clearFormOrPage.poStreetCode = undefined
        if (opt.isForm) {
          clearList.poCityList.value = []
          clearList.poStreetList.value = []
          clearList.poDistrictList.value = []
        } else {
          clearList.poCityList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
          clearList.poStreetList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
          clearList.poDistrictList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
        }

        break
      case '2':
        clearFormOrPage.districtCode = undefined
        clearFormOrPage.streetCode = undefined
        if (opt.isForm) {
          clearList.streetList.value = []
          clearList.districtList.value = []
        } else {
          clearList.streetList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
          clearList.districtList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
        }
        break
      case 'p2':
        clearFormOrPage.poDistrictCode = undefined
        clearFormOrPage.poStreetCode = undefined
        if (opt.isForm) {
          clearList.poStreetList.value = []
          clearList.poDistrictList.value = []
        } else {
          clearList.poStreetList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
          clearList.poDistrictList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
        }
        break
      case '1':
        clearFormOrPage.streetCode = undefined
        if (opt.isForm) {
          clearList.streetList.value = []
        } else {
          clearList.streetList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
        }
        break
      case 'p1':
        clearFormOrPage.poStreetCode = undefined
        if (opt.isForm) {
          clearList.poStreetList.value = []
        } else {
          clearList.poStreetList.value = [
            {
              value: '',
              label: '全部',
              childCode: opt.childCode,
            },
          ]
        }
        break
    }
  }
  return {
    simpleRequest,
    clearFormOrPageInput,
  }
}
