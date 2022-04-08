import Morgan from "morgan";
import Datadiri from "../../../model/Datadiri";
import { dbConnect, runMiddleware } from "../../../utils";

dbConnect();

export default async(req, res) => {
    const {method, body} = req;
    const morgan = Morgan("dev");
    

    switch (method) {
        case "GET":
            try{
                const bio = await Datadiri.find();
                await runMiddleware(req, res, morgan);
                return res.status(200).json(bio); //Berhasil Masuk

            } catch(err){
                // Gk berhasil masuk -> show server error (code 400)
                return res.status(400).json({ msg: err.message });
            }
        
        case "POST":
            try{
                const newbio = new Datadiri(body);
                const savedBio = await newbio.save();
                await runMiddleware(req, res, morgan);
                return res.status(200).json(savedBio); //Berhasil Masuk
            }catch(err){
                // Gk berhasil masuk -> show server error (code 400)
                return res.status(400).json({ msg: err.message });
            }
    }
};
