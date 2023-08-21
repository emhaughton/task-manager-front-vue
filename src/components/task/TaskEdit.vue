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
                    class="w-full p-2 border border-gray-300 outline-none rounded-md" />
            </div>
            <div class="mb-2">
                <label for="description">Descriptión</label>
                <textarea name="description" v-model="task.description"
                    class="w-full p-2 border border-gray-300 outline-none rounded-md" cols="10" rows="4"></textarea>
            </div>
            <div class="mb-2">
                <label for="status">Estado</label>
                <select name="status" v-model="task.status"
                    class="w-full p-2 border border-gray-300 outline-none rounded-md bg-white">
                    <option value="To do">To do</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="category">Category</label>
                <select name="category" v-model="task.category"
                    class="w-full p-2 border border-gray-300 outline-none rounded-md bg-white">
                    <option value="CSS">CSS</option>
                    <option value="PHP">PHP</option>
                    <option value="JS">JS</option>
                    <option value="Otros">Otros</option>
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

export default {

    setup() {
        let task = reactive({
            name: '',
            description: '',
            status: '',
            category: '',
        });
        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios
                .get(`http://task-manager.test/api/task/${route.params.id}`)
                .then((response) => {
                    const data = response.data.data;

                    task.name = data.name;
                    task.description = data.description;
                    task.status = data.status.name;
                    task.category = data.category.name;
                })
                .catch((error) => {
                    validation.value = error;
                });
        });

        function submit() {
            axios
                .put('http://task-manager.test/api/task/${route.params.id}', { ...task })
                .then((response) => {
                    validation.value = response;
                })
                .catch((error) => {
                    validation.value = error;
                });
        }

        return {
            task,
            validation,
            router,
            submit,
        };
    },
};
</script>