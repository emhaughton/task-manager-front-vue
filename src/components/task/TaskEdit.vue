<template>
    <div class="w-full">
        <div class="w-full  mb-4">
            <span v-if="validation.message" class="px-2 py-2 text-red-600 rounded shadow">
                {{ validation.message }}
            </span>
        </div>
        <form @submit.prevent="submit" class="w-full">
            <div class="mb-2">
                <label for="name">Título</label>
                <input type="text" name="name" v-model="task.name"
                    class="w-full p-2 border border-gray-300 outline-none rounded-md" required/>
            </div>
            <div class="mb-2">
                <label for="description">Descriptión</label>
                <textarea name="description" v-model="task.description"
                    class="w-full p-2 border border-gray-300 outline-none rounded-md" cols="10" rows="4"></textarea>
            </div>
            <div class="mb-2">
                <label for="status">Estado</label>
                <select name="status_uuid" v-model="task.status_uuid"
                    class="w-full p-2 border border-gray-300 outline-none rounded-md bg-white" required>
                    <option v-for="status in statuses.data" :value="status.uuid" v-bind:key="status.uuid">{{status.name}}</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="category">Category</label>
                <select name="category_uuid" v-model="task.category_uuid"
                    class="w-full p-2 border border-gray-300 outline-none rounded-md bg-white" required>
                    <option v-for="category in categories.data" :value="category.uuid" v-bind:key="category.uuid">{{category.name}}</option>
                </select>
            </div>
            <button class="px-6 py-2 text-white bg-blue-500  hover:bg-sky-700 rounded-md mr-3" type="submit">
                Actualizar
            </button>

            <button @click="$router.push('/')" class="px-6 py-2 text-white bg-gray-400  hover:bg-gray-600 rounded-md">
                Cancelar
            </button>
        </form>
    </div>
</template>
  
<script>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

let urlApi = import.meta.env.VITE_API_ENDPOINT; 

export default {

    setup() {
        let task = reactive({
            name: '',
            description: '',
            status_uuid: '',
            category_uuid: '',
        });

        let categories = reactive({
            data: ''
        });

        let statuses = reactive({
            data: ''
        });
        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios
                .get(`${urlApi}task/${route.params.id}`)
                .then((response) => {
                    const data = response.data.data;

                    task.name = data.name;
                    task.description = data.description;
                    task.status_uuid = data.status_uuid;
                    task.category_uuid = data.category_uuid;
                })
                .catch((error) => {
                    validation.value = error;
                });
        });

        onMounted(() => {
            axios
                .get(`${urlApi}category`)
                .then((response) => {
                   categories.data = response.data.data;
                })
                .catch((error) => {
                    validation.value = error;
                });
        });

        onMounted(() => {
            axios
                .get(`${urlApi}status`)
                .then((response) => {
                   statuses.data = response.data.data;
                })
                .catch((error) => {
                    validation.value = error;
                });
        });

        function submit() {
            axios
                .put(`${urlApi}task/${route.params.id}`, { ...task })
                .then(() => {
                    router.push({
                        name: 'home',
                    });
                    alert('tarea actualizada');
                })
                .catch((error) => {
                    validation.value = error;
                });
        }

        return {
            task,
            categories,
            statuses,
            validation,
            router,
            submit,
        };
    },
};
</script>