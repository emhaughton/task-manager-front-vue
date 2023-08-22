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
                    <option v-for="status in statuses.data" :value="status.uuid">{{status.name}}</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="category">Category</label>
                <select name="category_uuid" v-model="task.category_uuid"
                    class="w-full p-2 border border-gray-300 outline-none rounded-md bg-white" required>
                    <option v-for="category in categories.data" :value="category.uuid">{{category.name}}</option>
                </select>
            </div>
            <button class="px-6 py-2 text-white bg-blue-500  hover:bg-sky-700 rounded-md mr-3" type="submit">
                Crear
            </button>
            
            <button @click="$router.push('/')"
                class="px-6 py-2 text-white bg-gray-400  hover:bg-gray-600 rounded-md">
                Cancelar
            </button>
        </form>
    </div>
</template>
  
<script>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const task = reactive({
            uuid: crypto.randomUUID(),
            name: '',
            description: ''
        });

        
        let categories = reactive({
            data: ''
        });

        let statuses = reactive({
            data: ''
        });

        onMounted(() => {
            axios
                .get(`http://task-manager.test/api/category`)
                .then((response) => {
                   categories.data = response.data.data;
                })
                .catch((error) => {
                    validation.value = error;
                });
        });

        onMounted(() => {
            axios
                .get(`http://task-manager.test/api/status`)
                .then((response) => {
                   statuses.data = response.data.data;
                })
                .catch((error) => {
                    validation.value = error;
                });
        });

        const validation = ref([]);

        const router = useRouter();

        function submit() {
            axios
                .post('http://task-manager.test/api/task', { ...task })
                .then(() => {
                    router.push({
                        name: 'home',
                    });
                })
                .catch((error) => {
                    validation.value = error;
                });
        }

        return {
            task,
            validation,
            statuses,
            categories,
            router,
            submit,
        };
    },
};
</script>