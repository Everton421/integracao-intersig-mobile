import {   Request, Response    } from "express";
import { Select_clientes_sistema } from "../../models_sistema/cliente/select";
  import { Select_clientes_mobile } from "../../models_mobile/cliente/select";
import { databaseMobile, db_publico, db_vendas } from "../../database/databaseConfig";

    export class ClienteController{

        async main(req:Request , res:Response ){   
            let select_clientes_mobile =  new Select_clientes_mobile();
            let select_clientes_sistema = new Select_clientes_sistema();
                let database = databaseMobile
            try{
                let aux = await select_clientes_sistema.buscaTodos(db_publico );
                console.log(aux);
                return res.status(200).json(aux)
            }catch(e){

                console.log('erro ao consultar clientes' ,e)
            }
       
       
       
        }



    } 