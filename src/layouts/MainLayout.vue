<script setup>
import { onMounted, ref } from 'vue'

const appVersion = ref('')

onMounted(() => {
  if (window.electron && window.electron.getAppVersion) {
    appVersion.value = window.electron.getAppVersion()
  }
})

const closeApp = () => {
  if (window.electron && window.electron.closeApp) {
    window.electron.closeApp()
  }
}

const minimizeApp = () => {
  if (window.electron && window.electron.minimizeApp) {
    window.electron.minimizeApp()
  }
}

const toggleMaximizeApp = () => {
  if (window.electron && window.electron.toggleMaximizeApp) {
    window.electron.toggleMaximizeApp()
  }
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <div class="cursor-pointer q-mr-sm">
          <q-icon size="sm" name="mdi-message-text-fast-outline" />
        </div>
        <div class="cursor-pointer non-selectable q-mr-sm text-large">
          File
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="closeApp">Quit</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="cursor-pointer non-selectable q-mr-sm text-large">
          Help
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>About</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <q-separator vertical dark></q-separator>
        <q-toolbar-title class="non-selectable draggable q-space text-subtitle1">
          MaxtradeAMS
        </q-toolbar-title>
        <q-btn @click="minimizeApp" dense flat icon="mdi-window-minimize" />
        <q-btn @click="toggleMaximizeApp" dense flat icon="mdi-window-maximize" />
        <q-btn @click="closeApp" dense flat icon="mdi-close" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1">
          <div>
            MaxtradeAMS <span class="text-caption">v.{{ appVersion }}</span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped>
.draggable {
  -webkit-app-region: drag;
}
.q-toolbar {
  position: relative;
  padding: 0px 8px;
  min-height: 36px;
  width: 100%;
}
</style>
