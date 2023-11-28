<template>
  <div class="image-uploader">
    <label class="image-uploader__preview"
           :class="{ 'image-uploader__preview-loading': uploading }"
           :style="previewSrc">
      <span class="image-uploader__text">{{ text }}</span>
      <input type="file" accept="image/*" class="image-uploader__input"         @click="handleClick" @change="handleChange" ref="inputFile" v-bind="$attrs" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  data() {
    return {
      imagePreview: this.preview,
      uploading: false,
      file: null,
    };
  },
  props: {
    uploader: Function,
    preview: String
  },
  emits: ['select', 'upload', 'error', 'remove'],
  computed: {
    previewSrc() {
      return this.imagePreview ? `--bg-url:url(${this.imagePreview})` : null;
    },
    text() {
      if (this.uploading) {
        return 'Загрузка...';
      }
      if (this.imagePreview) {
        return 'Удалить изображение';
      } else {
        return 'Загрузить изображение';
      }
    },
  },
  methods: {
    handleClick(event) {
      if (this.imagePreview || this.uploading) {
        event.preventDefault();
      }
      if (this.imagePreview && !this.uploading) {
        this.imagePreview = null;
        this.$refs.inputFile.value = '';
        this.$emit('remove');
      }
    },
    handleChange(event) {
      const file = event.target.files[0];
      this.$emit('select', file);
      this.imagePreview = URL.createObjectURL(file);
      if (this.uploader) {
        this.uploadFile(file);
      }
    },
    async uploadFile(file) {
      if (this.uploader) {
        this.uploading = true;
        try {
          const result = await this.uploader(file);
          this.uploading = false;
          this.$emit('upload', result);
        } catch (error) {
          this.$refs.inputFile.value = '';
          this.$emit('error', error);
          this.uploading = false;
          this.imagePreview = null;
        }
      } else {
        this.uploading = false;
      }
    },
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
