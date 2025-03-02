<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const appVersion = ref('')
const { locale } = useI18n({ useScope: 'global' })
const localeOptions = [
  { value: 'en-US', label: 'English' },
  { value: 'bg-BG', label: 'Български' },
]

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

const exitApp = () => {
  if (window.electron && window.electron.exitApp) {
    window.electron.exitApp()
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
          {{ $t('File') }}
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="exitApp">{{ $t('Quit') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="cursor-pointer non-selectable q-mr-sm text-large">
          {{ $t('Tools') }}
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>{{ $t('Options') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="cursor-pointer non-selectable q-mr-sm text-large">
          {{ $t('Help') }}
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>{{ $t('About') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <q-separator vertical dark></q-separator>
        <q-toolbar-title class="non-selectable draggable q-space text-subtitle1">
          MaxtradeAMS
        </q-toolbar-title>
        <div>
          <q-select
            v-model="locale"
            :options="localeOptions"
            :label="$t('Change language')"
            label-color="grey-5"
            dense
            borderless
            emit-value
            map-options
            options-dense
            style="min-width: 150px"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-translate" color="grey-5" />
            </template>
          </q-select>
        </div>
        <q-separator vertical dark></q-separator>
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
