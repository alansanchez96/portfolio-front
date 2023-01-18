<template>
    <h2 class="text-white my-3">Mensajes</h2>

    <p class="fw-bold my-4 text-danger" v-show="errorServer">Ocurrio un error con el servidor</p>

    <div class="table-responsive">
        <table class="table table-striped table-dark"  v-show="showMessages">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Mensaje</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(message) in messages" :key="message">
                    <td>{{ message.id }}</td>
                    <td>{{ message.attributes.name }}</td>
                    <td>{{ message.attributes.email }}</td>
                    <td class="text-truncate" height="100">{{ message.attributes.message }}</td>
                    <td>#</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Mensajes',
    data() {
        return {
            'messages': [],
            'showMessages': true,
            'errorServer': false,
        }
    },
    async mounted() {
        await this.axios.get('/api/messages')
            .then(response => this.messages = response.data.data)
            .catch(() => {
                this.showMessages = false;
                this.errorServer = true;
            });
    }
}
</script>