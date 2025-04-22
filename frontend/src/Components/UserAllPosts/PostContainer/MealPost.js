import React,{Component} from "react";
import "./PostContainer.css";
import { Avatar, Paper } from "@mui/material";
import like from "../../../images/like.png"
import likebutton from "../../../images/likebutton.png"
import share from "../../../images/share.png"
import comment from "../../../images/comment.png"
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import firebase from "../../../firebase";
import "firebase/compat/storage";

const uploadImageToFirebase = (image) => {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`images/${image.name}`).put(image);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          
        },
        (error) => {
          reject(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };


class  Post extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        
            commentList:[],
            editMode: false,
            updatedDescription: this.props.object.description,
            updatedmealpreferences : this.props.object.mealpreferences,
            updatedcaloricgoals : this.props.object.caloricgoals,
            updatedmealTiming : this.props.object.mealTiming,
            updatedhealthGoals : this.props.object.healthGoals,
            updatedportionSize : this.props.object.portionSize,
            updatedmealpostImgURL: null
            
         }
         this.handleDeletePost = this.handleDeletePost.bind(this);
         this.handleEditPost = this.handleEditPost.bind(this);
         this.handleUpdatePost = this.handleUpdatePost.bind(this);
    }

    //add comment thing
    componentDidMount(){
        this.getComments();
    }
    //end

    isImageAvailable=(data)=>{
        return data==""?false:true;
    }

    handleDeletePost = () => {
        const { mealId } = this.props.object;
       
      
        
        fetch(`http://localhost:8080/api/mealpostService/delete/${mealId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              
              console.log('Post deleted successfully');
              window.location.reload();
              
            } else {
              
              console.error('Failed to delete post');
            }
          })
          .catch((error) => {
            console.error('Error deleting post:', error);
          });
      };

    handleEditPost = () => {
        this.setState({ editMode: true });
    };

    handleUpdatePost = async () => {
        const { mealId } = this.props.object;
        const { updatedDescription } = this.state;
        const{updatedmealpreferences} = this.state;
        const{updatedcaloricgoals} = this.state;
        const{updatedmealTiming} = this.state;
        const{updatedhealthGoals} = this.state;
        const{updatedportionSize} = this.state;
            

        let updatedmealpostImgURL = '';
        if (this.state.updatedmealpostImgURL) {
            try {
                updatedmealpostImgURL = await uploadImageToFirebase(this.state.updatedmealpostImgURL);
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        } else {
            updatedmealpostImgURL = this.props.object.mealpostImgURL;
        }

        const payload = {
            description: updatedDescription,
            mealpreferences:updatedmealpreferences,
            caloricgoals:updatedcaloricgoals,
            mealTiming:updatedmealTiming,
            healthGoals:updatedhealthGoals,
            portionSize:updatedportionSize,
            mealpostImgURL: updatedmealpostImgURL,
        };

        fetch(`http://localhost:8080/api/mealpostService/update/${mealId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Post updated successfully');
                    this.setState({ editMode: false });
                } else {
                    console.error('Failed to update post');
                }
            })
            .catch((error) => {
                console.error('Error updating post:', error);
            });
    };


    //add comment thing
    getComments = () => {
        fetch('http://localhost:8080/api/mealcommentService/getAllComments/' + this.props.object.mealId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ commentList: data });
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }

    submitComments = (event) => {
        if (event.key === "Enter") {
            let comment = event.currentTarget.value;
            if (comment.trim() !== "") {

                
                
                let payload = {
                    "commentId": Math.floor(Math.random() * 1000000).toString(),
                    "userId": JSON.parse(localStorage.getItem("user")).userId,
                    "mealId": this.props.object.mealId,
                    "comment": comment,
                    "userName":JSON.parse(localStorage.getItem("user")).userName,
                    "userImage" :JSON.parse(localStorage.getItem("user")).userImage,
                }

                const requestOptions = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }

                fetch("http://localhost:8080/api/mealcommentService/save", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to submit comment');
                    }
                    return response.json();
                })
                    .then(data => {
                        this.getComments();
                        
                    })
                    .catch(error => {
                        console.error('Error submitting comment:', error);
                    });

            }
        }
    }

    //end
    render() { 

        const { editMode, updatedDescription ,updatedmealpreferences ,updatedcaloricgoals ,updatedmealTiming ,updatedhealthGoals ,updatedportionSize } = this.state;

        return (
        <div>
            <Paper className="post_container">
                {/*header*/}
                <div className="post_header">
                    <div className="post_header_main">
                        <div className="post_header_image">
                            <Avatar src={this.props.object.userImage} className="post_img"/>
                        </div>
                        <div className="post_header_text">
                            {this.props.object.userName}
                        </div>
                    </div>
                    <div className="post-btns">
                            {editMode ? (
                                <BiSolidEdit color="green" fontSize="20px" cursor="pointer" onClick={this.handleUpdatePost} />
                            ) : (
                                <BiSolidEdit color="green" fontSize="20px" cursor="pointer" onClick={this.handleEditPost} />
                            )}
                            <MdOutlineDelete color="red" fontSize="20px" cursor="pointer" onClick={this.handleDeletePost} />
                        </div>
                    </div>
                
               
                {/* Render meal preferences */}
                {editMode ? (
                <div className="upload_mealpreferences_edit_mode">
                    <select
                    className="upload_mealpreferences"
                    value={updatedmealpreferences}
                    onChange={(e) => this.setState({ updatedmealpreferences: e.target.value })}
                    >
                    <option className="upload_mealpreferences" value="">Select Meal Preferences</option>
                    <option className="upload_mealpreferences" value="vegetarian">Vegetarian</option>
                    <option className="upload_mealpreferences" value="vegan">Vegan</option>
                    <option className="upload_mealpreferences" value="gluten-free">Gluten-Free</option>
                    </select>
                </div>
                ) : (
                this.props.object.mealpreferences && (
                    <div className="post_mealpreferences">
                    <div className="post_content">Meal Preferences: {this.props.object.mealpreferences}</div>
                    </div>
                )
                )}