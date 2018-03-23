<template>
  <el-dialog
    title="设备位置"
    :visible="visible"
    width="60%"
    @close="close()"
    @open="open()"
    center>
    <GPSDeviceMap ref="GPSDeviceMap"></GPSDeviceMap>
  </el-dialog>
</template>

<script>

export default {
  name: 'view-location-dialog',
  props: {
    visible: {
      require: true,
      type: Boolean,
      default: false
    },
    item: {
      require: true
    }
  },
  data: function () {
    return {
      msg: ''
    }
  },
  methods: {
    open() {
      console.log('open: ' + JSON.stringify(this.item))
      let that = this
      setTimeout(() => {
        that.$refs.GPSDeviceMap.showMap({
          width: '100%',
          height: '100%',
          type: 1,
          GPS: [that.item.longitude, that.item.latitude]
        })
      }, 100)
    },
    close() {
      console.log('close location dialog clicked')
      this.$emit('closeLocationDialog')
    }
  }
}
</script>

<style scoped>

</style>
