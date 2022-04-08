import { Modal, Button, Header} from "semantic-ui-react"

const Modal_Confirm = ({isUpdate, isDelete, setIsUpdate, setIsDelete, setConfirm, isConfirm}) =>{
    
    const handleConfirm = (e) => {
        setConfirm(false)
        setIsUpdate(false)
        setIsDelete(false)
    }
    
    return (
        <Modal
            onClose={() => setConfirm(false)}
            onOpen={() => setConfirm(true)}
            open={isConfirm}
        >
            <Modal.Content image>
            <Modal.Description>
                <Header>
                    {isUpdate ?
                        "Customer Successfully Updated" : 
                        isDelete ? 
                        "Customer Successfully Deleted" :
                        "Customer Successfully Added"
                    }</Header>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button
                content="Roger That"
                onClick={handleConfirm}
                positive
            />
            </Modal.Actions>
        </Modal>
    )
};

export default Modal_Confirm;