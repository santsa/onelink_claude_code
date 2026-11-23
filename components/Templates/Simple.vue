<template>
  <main class="p-4 bg-purple-200 h-full w-full space-y-8 pt-12 max-w-lg mx-auto">
    <div class="text-center">
      <div
        v-if="acc.i"
        class="h-20 w-20 rounded-full overflow-hidden ring ring-slate-200 mx-auto"
      >
        <img :src="acc.i" alt="name" class="h-full w-full object-cover" />
      </div>
      <h1 v-if="acc.n" class="text-2xl font-bold mt-4 text-slate-800">
        {{ acc.n }}
      </h1>
      <p v-if="acc.p" class="text-sm font-medium mt-1 text-purple-800">
        {{ acc.p }}
      </p>
      <p v-if="acc.d" class="text-sm mt-2 text-slate-600">
        {{ acc.d }}
      </p>
      <div
        v-if="acc.lo || websiteHref"
        class="mt-3 flex items-center justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600"
      >
        <span v-if="acc.lo" class="flex items-center gap-1">
          <icon name="ph:map-pin-duotone" class="h-4 w-4" />
          {{ acc.lo }}
        </span>
        <a
          v-if="websiteHref"
          :href="websiteHref"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 hover:underline"
        >
          <icon name="ph:globe-duotone" class="h-4 w-4" />
          {{ displayUrl(websiteHref) }}
        </a>
      </div>
    </div>
    <div
      v-if="!allSocialLinksAreEmpty"
      class="flex items-center justify-center flex-wrap"
    >
      <span v-if="acc.f" class="p-1">
        <a :href="acc.f" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:facebook-logo-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.t" class="p-1">
        <a :href="acc.t" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:twitter-logo-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.ig" class="p-1">
        <a :href="acc.ig" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:instagram-logo-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.m" class="p-1">
        <a :href="acc.m" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:envelope-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.tg" class="p-1">
        <a :href="acc.tg" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:telegram-logo-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.w" class="p-1">
        <a :href="`https://wa.me/${acc.w}`" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:whatsapp-logo-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.y" class="p-1">
        <a :href="acc.y" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:youtube-logo-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.e" class="p-1">
        <a :href="`mailto:${acc.e}`" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:envelope-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.gh" class="p-1">
        <a :href="acc.gh" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:github-logo-duotone" class="h-6 w-6" />
        </a>
      </span>
      <span v-if="acc.l" class="p-1">
        <a :href="acc.l" target="_blank" rel="noopener | noreferrer">
          <icon name="ph:linkedin-logo-duotone" class="h-6 w-6" />
        </a>
      </span>
    </div>
    <ul class="space-y-2">
      <ExternalLink
        v-for="(link, id) in acc.ls"
        :label="link.l"
        :icon="link.i"
        :url="link.u"
        :key="id"
      />
    </ul>
  </main>
</template>
<script setup>
const props = defineProps({
  acc: {
    type: Object,
    required: true,
  },
});

// Page data comes from the URL, so anyone can craft it: only allow http(s)
// links (blocks javascript:/data: XSS) and add https:// when no scheme is given.
const websiteHref = computed(() => {
  const url = (props.acc.ws || "").trim();
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return null;
  return `https://${url}`;
});

// Text shown for the website link, e.g. "https://www.winterfell.com/" -> ?
const displayUrl = (url) => {
  // TODO(human): return a short, human-friendly version of `url` for display
  return url;
};

const allSocialLinksAreEmpty = computed(() => {
  return (
    !props.acc.f &&
    !props.acc.t &&
    !props.acc.ig &&
    !props.acc.m &&
    !props.acc.tg &&
    !props.acc.w &&
    !props.acc.y &&
    !props.acc.e &&
    !props.acc.gh &&
    !props.acc.l
  );
});
</script>
<style scoped></style>
