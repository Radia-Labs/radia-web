import {useState} from 'react';
import {postImage} from '../utils'
import { useCurrentUser } from "../Providers/Auth"

const UploadImageModalBody = () => {
    const [image, setImage] = useState<{}>();
    const { currentUser } = useCurrentUser()

    const onFormSubmit = (e:any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image-file', image as Blob);
        postImage(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, formData);
    }
    const onChange = (e:any) => {
        setImage({file:e.target.files[0]});
    }
    
    return (
        <form onSubmit={onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" name="image-file" onChange={onChange} />
            <button type="submit">Upload</button>
        </form>
    )
    
}

export default UploadImageModalBody