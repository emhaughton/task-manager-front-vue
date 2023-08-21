import { createRouter, createWebHistory } from 'vue-router'
import TaskListView from '../views/resources/task/TaskListView.vue'
import TaskCreateView from '../views/resources/task/TaskCreateView.vue';
import TaskEditView from '../views/resources/task/TaskEditView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TaskListView
    },
    {
      path: '/create',
      name: 'create',
      component: TaskCreateView
    },    
    {
      path: '/edit/:id',
      name: 'edit',
      component: TaskEditView
    },
  ]
})

export default router
