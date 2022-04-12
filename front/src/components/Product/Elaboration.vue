<template><div></div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Elaboration',
    data() {
        return {
            step: 1,
        };
    },
    created() {
        //user is not authorized
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login');
        }
    },
}
</script>