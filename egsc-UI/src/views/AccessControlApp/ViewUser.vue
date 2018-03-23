<template>
  <div class="view-user">
    <p>人员信息</p>
    <div class="photo-info">
      <image-box :imageId='userData.imageUrl'></image-box>
    </div>
    <div class="user-info">
      <p>性别: {{userData.sex}}</p>
      <p>民族: {{userData.nation}}</p>
      <p>户籍: {{userData.nationPlace}}</p>
      <p>身份证: {{userData.idenNum}}</p>
      <p>电话: {{userData.telephone}}</p>
    </div>
  </div>
</template>
<script>
import ImageBox from '@/views/AccessControlApp/ImageBox'
export default {
  props: ['userData'],
  components: {
    ImageBox
  }
}
</script>
<style scoped lang="css">
.view-user > div {
  float: left;
}

.view-user > p {
  margin-top: 0;
  font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
  font-weight: 700;
  font-style: normal;
}

.photo-info > img{
  width: 201px;
  height: 251px;
}

.user-info{
  width: 210px;
  height: 100%;
  padding-left: 10px;
}

.user-info :first-child{
  margin-top: 5px;
}

.user-info > p{
  font-family: 'MicrosoftYaHei', '微软雅黑';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #5A6B78;
  line-height: 19px;
  margin-bottom: 30px;
}

</style>
