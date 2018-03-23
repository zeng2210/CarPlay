<template>
  <!-- 以图搜图 原始图片 -->
  <div class="pic-result-container">
    <div class="origin-pic">
      <div class="title">搜索图片</div>
      <div class="item-img">
        <img :src="imageUrl" />
      </div>
    </div>
    <div class="origin-desc">
      <div class="origin-desc-title">搜索结果：</div>
      <div class="origin-desc-item">人脸库相似图片：{{totalFace}}张</div>
      <div class="origin-desc-item">抓拍相似图片：{{totalCapt}}张</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'origin-pic',
  props: {
    imageUrl: {
      require: true,
      type: String
    },
    totalFace: {
      require: true,
      type: Number,
      default: 0
    },
    totalCapt: {
      require: true,
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/css/index";
  @picSize: 160px;
  .pic-result-container {
    display: flex;
    margin-top: 30px;

    & .origin-pic {
      width: 160px;
      height: 218px;

      & .title {
        height: 28px;
        line-height: 28px;
        font-size: 20px;
        color: #5a6b78;
        letter-spacing: 0;
        text-align: left;
      }

      & .item-img {
        width: @picSize;
        height: @picSize;
        margin-top: 12px;

        & img {
          width: 100%;
          height: 100%;
        }
      }
    }

    & .origin-desc {
      width: 150px;
      margin-left: 26px;
      margin-top: 40px;
      color: #5a6b78;
      letter-spacing: 0;
      line-height: 24px;
      text-align: left;

      & .origin-desc-title {
        font-size: 15px;
      }

      & .origin-desc-item {
        font-size: 14px;
      }
    }
  }
</style>
