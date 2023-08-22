<script setup>
import { VueTable } from "@harv46/vue-table"
import IconTrash from "../icons/IconTrash.vue";
import IconEdit from "../icons/IconEdit.vue";
import "@harv46/vue-table/dist/style.css";
import axios from "axios";
import { ref } from "vue";

let getData = ref([]);

const headers = ["Nombre","Estado", "Categoría", "Creado"];
const keyValue = ["name","status", "category","created_at"];

const filldatatable = () => axios.get("http://task-manager.test/api/task").then((result) => {
    getData.value = result.data?.data;
});

filldatatable();

const deleteItem = (uuid) => {
    axios.delete(`http://task-manager.test/api/task/${uuid}`).then((result) => {
        if (result.data.success) filldatatable();
    });
}

</script>

<template>
    <div class="grid grid-cols-1 gap-4 place-items-center h-20 w-full">
        <button @click="$router.push('/create')"
            class="px-6 py-2 text-white bg-blue-500  hover:bg-sky-700 rounded-md">
            Nueva tarea
        </button>
    </div>

    <VueTable :headers="headers" :keys="keyValue" :data="getData">
        <template #th>
            <th> Acciones</th>
        </template>
        <template #td="{ item }">
            <td>
                <div class="flex items-stretch">
                    <button  @click="$router.push(`/edit/${item.uuid}`)"
                        class="bg-sky-500 hover:bg-sky-700 text-white rounded-md p-1 mr-2">
                        <IconEdit />
                    </button>
                    <button @click="deleteItem(item.uuid)" 
                        class="bg-red-500 hover:bg-red-700 text-white rounded-md p-1">
                        <IconTrash />
                    </button>
                </div>
            </td>
        </template>
    </VueTable>
</template>
