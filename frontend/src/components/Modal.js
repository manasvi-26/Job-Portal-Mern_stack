import React, { Component } from 'react';
import {
    Button, Modal, Form, ModalHeader, ModalBody, FormGroup, Label, Input
} from 'reactstrap';

export default class SopModal extends Component {

    state = {
        sop: ''
    }

    onChange = (e)=>{
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {

        var x = this.state.sop
        this.props.apply(x,this.props.job)

    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.show}>
                    <ModalHeader>Enter your SOP (not more than 250 words..)</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <textarea defaultValue={this.state.sop} onChange={this.onChange} rows="15" cols="47" name="sop" />
                            <Button color="dark" style={{ marginTop: '2rem' }}>Submit Application</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

