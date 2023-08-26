import { NativeModules } from "react-native";

const {fsModule} = NativeModules;

type Callback = (message: string) => void

interface FSModuleInterface {
    justGreetMe(name: string): Promise<string>;
    getSize(uri: string): Promise<number>;
    compressImage(uri: string, compressValue: number): Promise<{uri: string, size: number}>;
    saveImageToDevice(imageUri: string, imageName: string, compressedValue: number):Promise<string>
}

export default fsModule as FSModuleInterface