<template>
  <div class="">
    <a-space>
      <a-select
        v-model:value="communityInfo.province"
        placeholder="选择省份"
        show-search
        style="width: 100px"
        :filter-option="filterOption"
        :options="poProvinceInfo"
        @change="handleCityChange"
      ></a-select>
      <a-select
        v-model:value="communityInfo.city"
        show-search
        style="width: 100px"
        placeholder="选择城市"
        :not-found-content="null"
        :options="cityInfo"
        :filter-option="filterOption"
        @change="handleDistrictChange"
      ></a-select>
      <a-select
        v-model:value="communityInfo.district"
        show-search
        placeholder="选择区县"
        style="width: 100px"
        :options="districtInfo"
        :filter-option="filterOption"
        @change="handleStreetChange"
      ></a-select>
      <a-select
        v-model:value="communityInfo.street"
        show-search
        style="width: 100px"
        placeholder="选择街道"
        :filter-option="filterOption"
        :not-found-content="null"
        :options="streetInfo"
        @change="handleChange"
      ></a-select>
      <a-select
        v-if="showCommunity"
        v-model:value="communityInfo.community"
        show-search
        style="width: 100px"
        placeholder="选择小区"
        :not-found-content="null"
        :options="community"
        @change="handleChange"
      ></a-select>
      <slot></slot>
    </a-space>
  </div>
</template>

<script setup>
  defineProps({
    showCommunity: {
      type: Boolean,
      default: false,
    },
  })
  import { reactive, ref } from 'vue'
  import { getCity, getDistrict, getStreet } from '@/api/system'

  const communityInfo = reactive({
    province: undefined,
    city: undefined,
    district: undefined,
    street: undefined,
    community: undefined,
  })
  let poProvinceInfo = ref([
    {
      value: '',
      label: '全部',
    },
  ])

  let cityInfo = ref([
    {
      value: '',
      label: '全部',
    },
  ])
  let districtInfo = ref([
    {
      value: '',
      label: '全部',
    },
  ])
  let streetInfo = ref([
    {
      value: '',
      key: 1,
      label: '全部',
    },
  ])
  //小区
  let community = ref([
    {
      value: '',
      key: 1,
      label: '全部',
    },
  ])
  //省

  // const getProvinceList = () => {
  //   getProvince().then((res) => {
  //     res.result.forEach((item) => {
  //       provinceInfo.value.push({ value: item.province_code, label: item.name })
  //     })
  //   })
  //   console.log(provinceInfo.value)
  // }
  // getProvinceList()
  //市
  const getCityList = (provinceObj) => {
    getCity(provinceObj).then((res) => {
      console.log(res)
      res.result.forEach((item) => {
        cityInfo.value.push({ value: item.city_code, label: item.name })
      })
    })
  }
  //区
  const getDistrictList = (cityObj) => {
    getDistrict(cityObj).then((res) => {
      console.log(res)
      res.result.forEach((item) => {
        districtInfo.value.push({ value: item.area_code, label: item.name })
      })
    })
  }
  // 街道
  const getStreetList = (districtObj) => {
    getStreet(districtObj).then((res) => {
      console.log(res)
      res.result.forEach((item) => {
        streetInfo.value.push({ value: item.street_code, label: item.name })
      })
      console.log(streetInfo)
    })
  }
  const handleCityChange = (value) => {
    communityInfo.city = undefined
    communityInfo.community = undefined
    communityInfo.district = undefined
    communityInfo.street = undefined
    getCityList({ provinceCode: value })
  }
  const handleDistrictChange = (value) => {
    communityInfo.community = undefined
    communityInfo.district = undefined
    communityInfo.street = undefined
    getDistrictList({ cityCode: value })
  }
  const handleStreetChange = (value) => {
    getStreetList({ areaCode: value })
  }
  const handleChange = () => {
    console.log(communityInfo)
  }
  const filterOption = (input, option) => {
    return option.label.indexOf(input) > -1
  }
  const clearSearch = () => {
    for (let communityInfoKey in communityInfo) {
      communityInfo[communityInfoKey] = undefined
    }
  }

  const poProvinceList = (poProvinceList) => {
    poProvinceInfo.value.push(...poProvinceList)
  }
  defineExpose({
    clearSearch,
    communityInfo,
    poProvinceList,
  })
</script>

<style
  scoped
  lang="less
"
></style>
