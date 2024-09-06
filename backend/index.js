"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express"
// import cors from "cors"
// import { studentRouter } from "./routes/studentRoute";
// import { adminRouter } from "./routes/adminRoute";
// import { pollRouter } from "./routes/pollRoute";
// import { PrismaClient } from "@prisma/client";
//@ts-ignore
var wbm_1 = require("wbm");
// import { error } from "console";
// const app = express();
// const prisma = new PrismaClient();
// app.use(express.json())
// app.use(cors())
// const BACKEND_PORT = process.env.PORT
// app.get("/test",async(req,res)=>{
// })
// app.listen(BACKEND_PORT,()=>{
//     console.log("Running")
// })
// app.use("/api/student",studentRouter)
// app.use("/api/admin",adminRouter)
// app.use("/api/poll",pollRouter)
// app.delete("/delete",async(req,res)=>{
//     try{
//         const deleted = await prisma.oTPRequest.deleteMany({
//         })
//         return res.json({message:"Deleted"})
//     }catch(er){
//         console.log(er)
//         return res.json({message:er})
//     }
// })
// app.get("/test",async(req,res)=>{
//     wbm.start().then(async () => {
//         const phones = ['9884890613'];
//         const message = 'Good Morning.';
//         await wbm.send(phones, message);
//         await wbm.end();
//         return res.json({})
//     }).catch((err:any) => console.log(err));
// })
function fn() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            wbm_1.default.start().then(function () { return __awaiter(_this, void 0, void 0, function () {
                var phones, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phones = ['9884890613',];
                            message = 'Good Morning.';
                            return [4 /*yield*/, wbm_1.default.send(phones, message)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, wbm_1.default.end()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).catch(function (err) { return console.log(err); });
            return [2 /*return*/];
        });
    });
}
fn();
