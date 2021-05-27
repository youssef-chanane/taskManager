import React, { Component } from 'react'
import axios from 'axios';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
 
class TaskEdit extends Component {

    constructor(props){
        super(props);
        this.state={
        name:'',
        task:[],
        errors:{},
        success:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }
    
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
        console.log(this.state.name);
        // console.log(e.target.value);

    }
    handleSubmit(e){
        e.preventDefault();
       const id = this.props.match.params.id;
        if(this.state.name==""){
            this.setState({
                errors:{
                    required:"the name is required"
                }
            });
            console.log(this.state.errors.required);
        }else{
            
            axios.put(`/tasks/${id}`,{
         
            name:this.state.name
        }).then(response=>{
            console.log('from handle submit ',response);
            //retourner au homePage
            this.props.history.push('/');
        });
        }
        
    }
   //get data from backend
   getTask(){
       const id = this.props.match.params.id
    axios.get(`/tasks/${id}/edit`).then(
        response=>{
            this.setState({
                task:response.data.task,
                name:response.data.task.name
            })
            console.log(this.state.name);
    }
    )
    }
    componentDidMount(){
        this.getTask();
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            
                <div className="card">
                    
                    <div className="card-body">
                        <h4 className="card-title">enter a task</h4>
                        <div className="card-text">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group ">
                                <label htmlFor="task" ></label>
                                <div className="col-sm-1-12">
                                    <textarea 
                                    onChange={this.handleChange}
                                    className={classNames("form-control",{
                                        'is-invalid':this.state.errors.required
                                    })}
                                    id="task"
                                    name="name" 
                                    placeholder="do a task" 
                                    value={this.state.name}/>
                                    <div className="invalid-feedback">{this.state.errors.required}</div>

                                </div>
                            </div>
                        
                                <button type="submit" className="btn btn-primary mb-3">submit</button><br/>
                                <div className="fs-2 badge rounded-pill bg-success text-light p-2 mb-3" >{this.state.success}</div> 
                        </form>
                        <div>
                        </div>
                        </div>
                    </div>
                </div>
                    
            
        )
    }
}
export default TaskEdit;