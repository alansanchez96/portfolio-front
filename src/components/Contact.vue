<template>
    <section class="page-section" id="contact">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-lg-8 col-xl-6 text-center">
                    <h2 class="mt-0">¡Mantengamosnos en contacto!</h2>
                    <hr class="divider" />
                </div>
            </div>
            <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div class="col-lg-6">

                    <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                        <div class="form-floating mb-3">
                            <input class="form-control" id="name" type="text" placeholder="Enter your name..."
                                data-sb-validations="required" />
                            <label for="name">Nombre Completo</label>
                            <div class="invalid-feedback" data-sb-feedback="name:required">El nombre completo es
                                requerido</div>
                        </div>

                        <div class="form-floating mb-3">
                            <input class="form-control" id="email" type="email" placeholder="name@example.com"
                                data-sb-validations="required,email" />
                            <label for="email">Email</label>
                            <div class="invalid-feedback" data-sb-feedback="email:required">El Email es requerido</div>
                            <div class="invalid-feedback" data-sb-feedback="email:email">El Email ingresado no es válido
                            </div>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea class="form-control" id="message" type="text"
                                placeholder="Enter your message here..." style="height: 10rem"
                                data-sb-validations="required"></textarea>
                            <label for="message">Mensaje</label>
                            <div class="invalid-feedback" data-sb-feedback="message:required">El mensaje no puede
                                enviarse vacío
                            </div>
                        </div>

                        <div class="d-none" id="submitSuccessMessage">
                            <div class="text-center mb-3">
                                <div class="fw-bolder">¡Tu mensaje fué enviado satisfactoriamente!</div>
                                <br />
                                <a href="https://github.com/alansanchez96/" target="_blank">Gracias por enviar un
                                    mensaje, puedes revisar mi perfil en GitHub :)</a>
                            </div>
                        </div>

                        <div class="d-none" id="submitErrorMessage">
                            <div class="text-center text-danger mb-3">Error sending message!</div>
                        </div>

                        <div class="d-grid"><button class="btn btn-primary btn-xl disabled" id="submitButton"
                                type="submit">Submit</button></div>
                    </form>
                </div>
            </div>
            <div class="row gx-4 mt-5 gx-lg-5 justify-content-center">
                <div class="col-lg-4 text-center mb-5 mb-lg-0 w-75">
                    <h3>Puedes encontarme en</h3>
                    <div class="mt-3 w-50 mx-auto d-flex flex-column flex-sm-row justify-content-around">
                        <a href="https://fb.com/alaansannchezz" target="_blank"><i class='bx bxl-facebook bx-2'></i></a>
                        <a href="https://linkedin.com/in/alansanchez96/" target="_blank"><i
                                class='bx bxl-linkedin bx-2'></i></a>
                        <a href="https://github.com/alansanchez96" target="_blank"><i
                                class='bx bxl-github bx-2'></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Contact'
}
</script>