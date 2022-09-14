import {useState}  from 'react';
import {Box, H1, Paragraph, Button, Input, Select, Text, Spinner} from "./styles";
import {colors} from "../constants";

type Props = {
    loading: boolean;
    collections: Array<object>;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCollectionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    collectionName: string;
    submitCollection: () => void;
    handleSetCreateNew?: () => void;
    updateCollection?: () => void;
    collection?: string;
}

const CreateNewCollectionModalBody = ({loading, collections, handleNameChange, handleCollectionChange, collectionName, submitCollection, handleSetCreateNew, updateCollection}: Props) => (
    <Box padding="1em" textAlign="center">
        <H1>Create New Collection</H1>
        <Paragraph textAlign="center">Create a Collection with your selected NFTs.</Paragraph>
       <Input placeholder="Collection Name" margin="0 0 1em 0" onChange={handleNameChange}/>
       <Button onClick={submitCollection} width="100%" background={`${colors.darkPurple}`} disabled={collectionName.length < 1}>{ loading ? <Spinner/> : "Create Collection" }</Button>
    </Box>
)

const AddToCollectionModalBody = ({loading, collections, handleNameChange, handleCollectionChange, collectionName, submitCollection, handleSetCreateNew, updateCollection, collection}: Props) => (
    <Box padding="1em" textAlign="center">
        <H1>Add To Collection</H1>
        <Paragraph textAlign="center">Select a collection to add your NFTs</Paragraph>
        <Select onChange={handleCollectionChange}>
            <option value={0}>Select a Collection</option>
            {collections.map((collection:any) => {
                return <option value={collection.name}>{collection.name}</option>
            })}
        </Select>
       <Button 
        margin="0 0 1em 0"
        onClick={updateCollection}
        width="100%" 
        background={`${colors.darkPurple}`} 
        disabled={!collection}>
            {loading ? <Spinner/> :"Add to Collection"}
        </Button>
       <Text cursor="pointer" fontSize=".8em" onClick={handleSetCreateNew}>Or, create a new Collection</Text>
    </Box>
)

const CollectionModalBody = ({loading, collections, handleNameChange, handleCollectionChange, collectionName, submitCollection, updateCollection, collection}: Props) => {
    const [createNew, setCreateNew] = useState<boolean>(false)

    const handleSetCreateNew = () => {
        setCreateNew(true)
    }

    return (
    collections && collections.length && !createNew
    ? 
    <AddToCollectionModalBody
    loading={loading}
    collections={collections} 
    handleNameChange={handleNameChange} 
    handleCollectionChange={handleCollectionChange}
    collectionName={collectionName} 
    submitCollection={submitCollection} 
    handleSetCreateNew={handleSetCreateNew}
    updateCollection={updateCollection}
    collection={collection}
    /> 
    : <CreateNewCollectionModalBody 
    loading={loading}
    collections={collections} 
    handleNameChange={handleNameChange} 
    handleCollectionChange={handleCollectionChange}
    collectionName={collectionName} 
    submitCollection={submitCollection}
    />
    )
}




export default CollectionModalBody;