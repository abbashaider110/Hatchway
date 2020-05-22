import React from 'react';
import './App.css';
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent
} from "react-collapsible-component";

let average = 0;
let sum = 0;



class App extends React.Component {
constructor(props) {
  super(props);
  this.handleKeyDown = this.handleKeyDown.bind(this);

}
  state = {
    isLoading:true,
    students:[],
    filterStudents:[],
    error:null,
    tag: [],
    filterTag: []
  }
  calculateAverage =(grades) => {
     sum = grades.map((grade) =>{
      return parseInt(grade, 10);
    }).reduce((acc, curr) =>{
     return acc + curr;
    }, 0);
    return Number(average = sum / grades.length).toFixed(2);
    }
  fetchStudents() {
      fetch(`https://www.hatchways.io/api/assessment/students`)
      .then((response) => response.json())
      .then((data) =>{
        console.log(data);
        this.setState({
          students: data.students,
          filterStudents: data.students,
          isLoading:false,
          error: null
        });
        return data;
      })
      .catch((error) => this.setState({error, isLoading:false}));
    }
  componentDidMount() {
      this.fetchStudents();
    }
    

  onTextChange = (e) => {
      //let{students} = this.state.students;
      let input = e.target.value;
      // let tagInput = e.target.tagvalue;
      let result =  this.state.students.filter((student) =>{
      let textMatch = student.firstName.toLowerCase().includes(input.toLowerCase()) || student.lastName.toLowerCase().includes(input.toLowerCase());
      // let tagMatch = student.grades.indexOf(tagInput) > -1;
      return textMatch;

     });
     console.log(result);
     this.setState({filterStudents:result});
     }
    
  handleKeyDown(id, e) {
  // // if (e.key === 'Enter') {
  //   let input = e.target.value;
  //   document.getElementById("add-tag-input").insertAdjacentHTML("beforebegin", `${input}`); 
  // } else {
  //   console.log('not validate');
  // }
  console.log(id, e);
  }

  
  render() {
    
    const {isLoading, filterStudents, error} = this.state;
    return (
      <React.Fragment>
      <input 
      placeholder="Search Student"
      type= "text"
      className="text-input"
      value= {this.props.text}
      onChange= {this.onTextChange} 
      />  
      <input 
      placeholder="Search by tag"
      type= "text"
      className="text-input"
      tagvalue= {this.props.text}
      onChange= {this.onTextChange} 
      />  
        <h1 className="header">Students</h1>
      {error ? <p>error accoured</p> : null}
      {!isLoading ? (
        
        filterStudents.map((student, i) =>{
          const {company, email, firstName, grades, lastName, pic, skill, id} = student;
          
          return (
            <div key={i} className="container">
            <div className="image">
            <img src ={`${pic}`} alt ="pic"/>
            </div>
            <div className="description">
            <h1>{firstName} {lastName}</h1>
            <p>Email: {email}</p>
            <p>Company: {company}</p>
            <p>Skills: {skill}</p>
            <CollapsibleComponent>
            <CollapsibleHead>
            <p>Average: {this.calculateAverage(grades)}% <span>&#43;</span></p>
            </CollapsibleHead>
            <CollapsibleContent>
            {
              grades.map((grade, i) =>{
              return (
                <p key={i}>Test {i + 1}: {grade} % </p>
              );
              })
            }
        

            <input
            className="add-tag-input"
            type="text"
            value={this.props.text}
            onChange={this.handleKeyDown(id)}
            />
            </CollapsibleContent>
            </CollapsibleComponent>
            </div>
            </div>
          );
        })
      ) : (
        <h3>Loading...</h3>
      )}
      </React.Fragment>
    
    );
      }

}

export default App;