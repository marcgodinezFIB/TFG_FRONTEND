<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <div class="mt-4">
            <button type="submit" class="btn btn-dark btn-lg btn-block" style="float:right">Sign In</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>