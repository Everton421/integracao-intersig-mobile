import { databaseMobile } from "../../database/databaseConfig";
import { InsertUsuarioMobile } from "../../models_mobile/usuario/insert";
import { SelectUsuariosMobile } from "../../models_mobile/usuario/select";
import { UpdateUsuarioMobile } from "../../models_mobile/usuario/update";
import { SelectUsuariosSistema } from "../../models_sistema/usuarios/select";
import { IUsuario } from "../../models_sistema/usuarios/types/IUsuario";

export class UsuarioController{
    async main(){

         let selectUsuariosSistema = new SelectUsuariosSistema();
         let selectUsuariosMobile = new SelectUsuariosMobile();
         let updateUsuarioMobile = new UpdateUsuarioMobile();
        let insertUsuarioMobile = new InsertUsuarioMobile();

         let usuariosSistema = await selectUsuariosSistema.select()
         
         if(usuariosSistema.length > 0 ){

                 for( let i of usuariosSistema){

            if(i.email === '' || !i.email ){
                i.email = 'semEmaill@semEmail.com'
            }  if(i.senha === '' || !i.senha ){
                i.senha = '***'
            }
                    let objInsert:IUsuario ={
                        codigo:i.codigo,
                        cnpj:databaseMobile,
                        email:i.email,
                        nome: i.nome,
                        senha:i.senha,
                        responsavel:'N'

                    }
                     let validUsuariosSistema = await selectUsuariosMobile.buscaPorCodigo(databaseMobile, i.codigo);
 
                     if( validUsuariosSistema.length > 0 ){

                                     await updateUsuarioMobile.update(databaseMobile, objInsert)
                         }else{
                              await insertUsuarioMobile.cadastrarCodigoSistema(databaseMobile, objInsert)
                         }
 
                 }
         }
    }
}