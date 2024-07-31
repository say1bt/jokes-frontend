"use client";
import React, { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import Navbar from "../components/NavBar";
import { getAllJokes, addCategory, updateJokeContent, deleteSubmittedJoke, rejectSubmitedJoke, approveSubmittedJoke, submitApprovedJokes } from "../api";
import EditJokeModal from "../components/EditJokeModal";
import ChangeCategoryModal from "../components/ChangeCategoryModal";
import { Joke } from "../types";
import { modal_constants, token_constants } from "../constants/generalConstants";

const ModerateJokes = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [submittedJokes, setSubmittedJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newCategory, setNewCategory] = useState<string>("");
  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isChangeCategoryModalVisible, setIsChangeCategoryModalVisible] = useState<boolean>(false);
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [currentJokeForCategoryChange, setCurrentJokeForCategoryChange] = useState<Joke | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(token_constants.ACCESS_TOKEN) || "";
    setAccessToken(token);
    setIsModalVisible(!token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchJokes = async () => {
        try {
          const unmoderateJokesResponse = await getAllJokes();
          const unmoderateJokes = unmoderateJokesResponse?.data;
          setSubmittedJokes(unmoderateJokes);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };

      fetchJokes();
    }
  }, [accessToken]);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem(token_constants.ACCESS_TOKEN, token);
    setAccessToken(token);
    setIsModalVisible(false);
  };

  const handleApprove = async (jokeId: string, jokeContent: string, jokeType: string) => {
    try {
      await approveSubmittedJoke(jokeId);
      const finalJson = { content: jokeContent, type: jokeType };
      await submitApprovedJokes(finalJson);
      setSubmittedJokes(submittedJokes.filter((joke: Joke) => joke._id !== jokeId));
    } catch (error) {}
  };

  const handleReject = async (jokeId: string) => {
    try {
      await rejectSubmitedJoke(jokeId);
      // setSubmittedJokes(submittedJokes.filter((joke) => joke._id !== jokeId));
    } catch (error) {}
  };

  const handleDelete = async (jokeId: string): Promise<void> => {
    try {
      await deleteSubmittedJoke(jokeId);
      setSubmittedJokes(submittedJokes.filter((joke: Joke) => joke._id !== jokeId));
    } catch (error) {}
  };

  const handleEdit = (joke: Joke) => {
    setCurrentJoke(joke);
    setIsEditModalVisible(true);
  };

  const handleSave = async (updatedJoke: Joke) => {
    try {
      if (updatedJoke._id) {
        await updateJokeContent({ content: updatedJoke.content, typeId: updatedJoke.type!, approved: updatedJoke.approved }, updatedJoke._id);
        setSubmittedJokes((prevJokes: Joke[]) => prevJokes.map((joke: Joke) => (joke._id === updatedJoke._id ? updatedJoke : joke)));
        setIsEditModalVisible(false);
      }
    } catch (error) {}
  };

  const handleChangeCategory = (joke: Joke) => {
    setCurrentJokeForCategoryChange(joke);
    setIsChangeCategoryModalVisible(true);
  };

  const handleCategoryChange = async (newCategory: string) => {
    if (!currentJokeForCategoryChange) return;

    try {
      await updateJokeContent({ content: currentJokeForCategoryChange.content, typeId: newCategory, approved: currentJokeForCategoryChange.approved }, currentJokeForCategoryChange._id!);
      setSubmittedJokes((prevJokes: Joke[]) => prevJokes.map((joke: Joke) => (joke._id === currentJokeForCategoryChange._id ? { ...joke, type: newCategory } : joke)));
      setIsChangeCategoryModalVisible(false);
    } catch (error) {}
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;

    try {
      await addCategory({ type: newCategory });
      setNewCategory("");
      setShowCategoryForm(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Navbar />
      <LoginModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} onLoginSuccess={handleLoginSuccess} />

      {accessToken && !isModalVisible && (
        <div>
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Welcome to the Joke Moderation Panel</h1>
            <button onClick={() => setShowCategoryForm(!showCategoryForm)} style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" }}>
              {showCategoryForm ? modal_constants.CANCEL : modal_constants.ADD_NEW_CATEGORY}
            </button>
          </div>

          {showCategoryForm && (
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New category name" style={{ padding: "10px", width: "200px", borderRadius: "5px", border: "1px solid #ddd", marginRight: "10px" }} />
              <button onClick={handleAddCategory} style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#28a745", color: "#fff", border: "none", cursor: "pointer" }}>
                Add Category
              </button>
            </div>
          )}

          <h2 style={{ textAlign: "left", color: "#333" }}>Submitted Jokes</h2>

          {loading ? (
            <div style={{ textAlign: "center" }}>
              <p>Loading jokes...</p>
            </div>
          ) : submittedJokes.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <p>No jokes to moderate.</p>
            </div>
          ) : (
            <div>
              {submittedJokes.map((joke: Joke) => (
                <div key={joke._id} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "10px" }}>
                  <p style={{ fontSize: "16px", color: "#555" }}>{joke.content}</p>
                  {/* <p style={{ fontSize: "14px", color: "#888" }}>Category: {joke.type}</p> */}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    <button onClick={() => handleEdit(joke)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#ffc107", color: "#fff", border: "none", cursor: "pointer" }}>
                      Edit
                    </button>
                    <button onClick={() => handleApprove(joke._id!, joke?.content, joke?.type!)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#28a745", color: "#fff", border: "none", cursor: "pointer" }}>
                      Approve
                    </button>
                    <button onClick={() => handleReject(joke._id!)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#dc3545", color: "#fff", border: "none", cursor: "pointer" }}>
                      Reject
                    </button>
                    <button onClick={() => handleDelete(joke._id!)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#6c757d", color: "#fff", border: "none", cursor: "pointer" }}>
                      Delete
                    </button>
                    <button onClick={() => handleChangeCategory(joke)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#17a2b8", color: "#fff", border: "none", cursor: "pointer" }}>
                      Change Category
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <EditJokeModal visible={isEditModalVisible} onClose={() => setIsEditModalVisible(false)} joke={currentJoke} onSave={handleSave} />

          <ChangeCategoryModal visible={isChangeCategoryModalVisible} onClose={() => setIsChangeCategoryModalVisible(false)} onChangeCategory={handleCategoryChange} currentCategory={currentJokeForCategoryChange! ? currentJokeForCategoryChange.type! : ""} />
        </div>
      )}
    </div>
  );
};

export default ModerateJokes;
