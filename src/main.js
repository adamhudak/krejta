import './style.css'
import Alpine from 'alpinejs'

Alpine.data('portfolio', () => ({
  filter: 'all',
  search: '',
  transitioning: false,

  filterButtons: [
    { value: 'all',       label: 'All' },
    { value: 'websites',  label: 'Websites' },
    { value: 'branding',  label: 'Branding' },
    { value: 'campaigns', label: 'Campaigns' },
  ],

  projects: [
    { id: 1, category: 'websites',  title: 'E-Commerce Platform Redesign',  tag: 'Websites'  },
    { id: 2, category: 'branding',  title: 'Luxury Brand Identity',          tag: 'Branding'  },
    { id: 3, category: 'campaigns', title: 'Summer Campaign 2026',           tag: 'Campaigns' },
    { id: 4, category: 'websites',  title: 'Corporate Website Development',  tag: 'Websites'  },
    { id: 5, category: 'branding',  title: 'Tech Startup Branding',          tag: 'Branding'  },
    { id: 6, category: 'campaigns', title: 'Product Launch Campaign',        tag: 'Campaigns' },
    { id: 7, category: 'websites',  title: 'Portfolio Website',              tag: 'Websites'  },
    { id: 8, category: 'branding',  title: 'Restaurant Brand Identity',      tag: 'Branding'  },
    { id: 9, category: 'campaigns', title: 'Holiday Marketing Campaign',     tag: 'Campaigns' },
  ],

  get filteredProjects() {
    const q = this.search.trim().toLowerCase()
    return this.projects.filter(p => {
      const matchFilter = this.filter === 'all' || p.category === this.filter
      const matchSearch = q === '' || p.title.toLowerCase().includes(q)
      return matchFilter && matchSearch
    })
  },

  async setFilter(value) {
    if (this.filter === value) return
    this.transitioning = true
    await new Promise(r => setTimeout(r, 180))
    this.filter = value
    await this.$nextTick()
    this.transitioning = false
  },
}))

window.Alpine = Alpine
Alpine.start()
