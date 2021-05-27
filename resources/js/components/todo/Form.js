import axios from 'axios';
import classNames from 'classnames';
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Form extends Component {
    constructor(props){
        super(props);
        this.state={
        name:'',
        tasks:[],
        errors:{},
        success:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.renderTasks=this.renderTasks.bind(this);
        this.handleDelete=this.handleDelete.bind(this);

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
        if(this.state.name==""){
            this.setState({
                errors:{
                    required:"the name is required"
                }
            });
            console.log(this.state.errors.required);
        }else{
            
            axios.post('/tasks',{
         
            name:this.state.name
        }).then(response=>{
            console.log('from handle submit ',response);
            this.setState({
                tasks:[response.data,...this.state.tasks],
                name:"",
                errors:{},
                success:"task was created successfuly"
            });
        });
        }
        
    }
    renderTasks(){
        return this.state.tasks.map(task=>{
            return(<div className="card" key={task.id}>
                <div className="card-body" >
                    <div>
                        {task.name}
                        <Link to={`${task.id}/edit`}  className="btn btn-sm btn-primary mx-1 float-right">Update</Link>
                        <button className="btn btn-sm btn-danger float-right" onClick={()=>this.handleDelete(task.id)}>delete</button> 
                    </div>
                </div>

            </div>);
        });
    }
    //get data from backend
    getTasks(){
        axios.get('/tasks').then(
            response=>this.setState({
                tasks:[...response.data.tasks]
            })
        )
    }
    componentDidMount(){
        this.getTasks();
    }
    //delete task
    handleDelete(id){
        //delete from local state
        const newTasks=this.state.tasks.filter(task=>task.id!=id);
        this.setState({
            tasks:[...newTasks]
        });
        //delete from database
        axios.delete(`/tasks/${id}`)
    }
    render() {
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
                            {this.renderTasks()}
                        </div>
                        </div>
                    </div>
                </div>
                    
            
        )
    }
}
export default Form;