<script setup>
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
        <div class="cursor-pointer non-selectable">
          File
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Open...</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>New</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Preferences</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list dense>
                    <q-item v-for="n in 3" :key="n" clickable>
                      <q-item-section>Submenu Label</q-item-section>
                      <q-item-section side>
                        <q-icon name="keyboard_arrow_right" />
                      </q-item-section>
                      <q-menu auto-close anchor="top end" self="top start">
                        <q-list dense>
                          <q-item v-for="n in 3" :key="n" clickable>
                            <q-item-section>3rd level Label</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Quit</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="cursor-pointer non-selectable">
          Edit
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Cut</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Copy</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Paste</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Select All</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <q-toolbar-title> Title </q-toolbar-title>
        <q-space />
        <q-btn @click="minimizeApp" dense flat icon="minimize" />
        <q-btn @click="toggleMaximizeApp" dense flat icon="crop_square" />
        <q-btn @click="closeApp" dense flat icon="close" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
