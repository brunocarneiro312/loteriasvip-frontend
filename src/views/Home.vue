<template>
   <div id="home">
      <div class="file-upload-container">
         <div class="form-upload">
            <div class="flex-container space-between">
               <div>
                  <label for="input-file-compradores">Importar arquivo de compradores</label>
                  <input type="file" id="input-file-compradores" name="file" @change="onFileChange($event, 1)"/>
                  <div v-if="request.arquivoCompradores">
                     Arquivo Selecionado: {{ request.arquivoCompradores.name }}
                  </div>
               </div>
               <div>
                  <button class="submit" @click="sendFile(request.arquivoCompradores)">Extrair</button>
               </div>
            </div>
         </div>
         <div class="form-upload">
            <div class="flex-container space-between">
               <div>
                  <label for="input-file-lotofacil">Importar arquivo de jogos (Lotofacil)</label>
                  <input type="file" id="input-file-lotofacil" @change="onFileChange($event, 2)"/>
                  <div v-if="request.arquivoLotofacil">
                     Arquivo Selecionado: {{ request.arquivoLotofacil.name }}
                  </div>
               </div>
               <div>
                  <button class="submit" @click="sendFile(request.arquivoLotofacil)">Extrair</button>
               </div>
            </div>
         </div>
         <div class="form-upload">
            <div class="flex-container space-between">
               <div>
                  <label for="input-file-lotomania">Importar arquivo de jogos (Lotomania)</label>
                  <input type="file" id="input-file-lotomania" @change="onFileChange($event, 3)"/>
                  <div v-if="request.arquivoLotomania">
                     Arquivo Selecionado: {{ request.arquivoLotomania }}
                  </div>
               </div>
               <div>
                  <button class="submit" @click="sendFile(request.arquivoLotomania)">Extrair</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: 'Home',
        components: {},
        data: function () {
            return {
                request: {
                    arquivoCompradores: undefined,
                    arquivoLotofacil: undefined,
                    arquivoLotomania: undefined,
                },
                fileType: undefined,
            }
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
   #home {
      padding: 15px;

      label {
         display: block;
      }

      .form-upload {
         padding: 15px;
         box-shadow: 0 1px 10px #ddd;
         margin-bottom: 25px;
      }

      .flex-container {
         display: flex;
         align-items: center;
      }

      .space-between {
         justify-content: space-between;
      }

      .submit {
         border: 0;
         outline: 0;
         padding: 10px;
         background: dodgerblue;
         color: white;
         border-radius: 5px;
         cursor: pointer;

         &:hover {
            opacity: .8;
         }
      }

   }
</style>
