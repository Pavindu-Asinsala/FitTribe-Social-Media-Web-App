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
