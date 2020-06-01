<template>
   <div id="home">
      <div class="login" v-if="!isUserLoggedIn">
         <LoginForm></LoginForm>
      </div>
   </div>
</template>

<script>

    import axios from 'axios';
    import eventbus from "../eventbus";
    import LoginForm from "./LoginForm";

    export default {
        name: 'Home',
        components: {LoginForm},
        data: function () {
            return {
                request: {
                    arquivoCompradores: undefined,
                    arquivoLotofacil: undefined,
                    arquivoLotomania: undefined,
                },
                fileType: undefined,
                isUserLoggedIn: false,
            }
        },
        created() {
            if (localStorage.getItem('tokenData')) {
                this.isUserLoggedIn = true;
            }
            eventbus.$on('loginEvent', () => this.isUserLoggedIn = true);
        },
        methods: {
            onFileChange(event, fileType) {
                switch (fileType) {
                    case 1:
                        this.request.arquivoCompradores = event.target.files[0];
                        console.log(event.target.files[0]);
                        this.fileType = 1;
                        break;
                    case 2:
                        this.request.arquivoLotofacil = event.target.files[0];
                        console.log(event.target.files[0]);
                        this.fileType = 2;
                        break;
                    case 3:
                        this.request.arquivoLotomania = event.target.files[0];
                        console.log(event.target.files[0]);
                        this.fileType = 3;
                        break;
                    default:
                        console.log('Arquivo não suportado!');
                }
            },
            sendFile(file) {
                let formData = new FormData();
                formData.append("file", file);

                let endpoint = undefined;

                if (this.fileType === 1) {
                    endpoint = 'http://localhost:8080/loteriasvip/api/v1/upload/compradores';
                }
                if (this.fileType === 2) {
                    endpoint = 'http://localhost:8080/loteriasvip/api/v1/upload/lotofacil';
                }
                if (this.fileType === 3) {
                    endpoint = 'http://localhost:8080/loteriasvip/api/v1/upload/lotomania';
                }

                axios.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicnVuby5jYXJuZWlybzMxMkBnbWFpbC5jb20iLCJleHAiOjE1OTEzNzgxNzksImlhdCI6MTU5MDc3MzM3OX0.bSvgW8ZzLpv1NHTyEFCcaVPW16bSK_3cdmM7Iow3y48OIJE_0tBXJJReFuy7-DMGb6DidID3CXJscUAzGg3Wnw'
                    }
                }).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style lang="scss">
   @import '../assets/css/tailblocks.css';

   * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
   }

   #logo {
      animation-name: flip-diagonal-tr;
      animation-duration: 1s;
      animation-timing-function: ease;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: none;
   }

   .hero-list {
      li::before {
         content: "\2192";
      }
   }

   .subheading {
      font-size: 1.5em;
   }

   @keyframes flip-diagonal-tr {
      0%{
         -webkit-transform: rotate3d(1,1,0,0deg);
         transform: rotate3d(1,1,0,0deg);
      }
      100%{
         -webkit-transform: rotate3d(1,1,0,180deg);
         transform: rotate3d(1,1,0,360deg);
      }
   }
</style>
