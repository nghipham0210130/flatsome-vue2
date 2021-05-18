import VueRouter from 'vue-router'

const Bags = {
	template: `
<div>
	<h3>Grid for Bags</h3>
</div>
  `
}

const Bookings = {
	template: `
<div>
	<h3>Preview of your profile</h3>
</div>
  `
}

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/bags',
        component: Bags,
    }, {
        path: '/bookings',
        components: Bookings
        }
    ]
  })
  