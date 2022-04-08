
import Morgan from "morgan";
import Datadiri from "../../../model/Datadiri";
import { dbConnect, runMiddleware } from "../../../utils";

dbConnect();

export default async(req, res) => {
    const {method, body, query:{id}} = req;
    const morgan = Morgan("dev");

    switch (method) {
        case "GET":
            try{
                const bio = await Datadiri.find();
                if(!bio) return res.status(400).json({ msg: "User not found" });

                await runMiddleware(req, res, morgan);
                return res.status(200).json(bio); //Berhasil Masuk

            } catch(err){
                // Gk berhasil masuk -> show server error (code 400)
                return res.status(400).json({ msg: err.message });
            }

        case "PUT":
            try{
                const updateBio = await Datadiri.findByIdAndUpdate(id,body, {
                    new:true,
                    runValidators:true
                });
                if(!updateBio) return res.status(400).json({ msg: "User not found" });

                return res.status(200).json(updateBio); //Berhasil Masuk

            }catch(err){
                // Gk berhasil masuk -> show server error (code 400)
                return res.status(400).json({ msg: err.message });
            }

        case "DELETE":
            try{
                const deleteBio = await Datadiri.findByIdAndDelete(id);
                if(!deleteBio) return res.status(400).json({ msg: "No User to Delete" });

                await runMiddleware(req, res, morgan);
                return res.status(200).json(); //Berhasil Masuk
            }catch(err){
                // Gk berhasil masuk -> show server error (code 400)
                return res.status(400).json({ msg: err.message });
            }
        
        default:
            return res.status(400).json({msg: "This method currently not supported. Please selece GET, PUT, POST or DELETE"})
    }
};