import React, { Component } from "react";
import firebase from "react-native-firebase";

const firestoreSubscribe = (firebaseRef, onData) => {
  let unsubscribeFn;
    unsubscribeFn = firebaseRef.onSnapshot(
      handleCollectionReferenceSnapshot.bind(this, onData),
      handleSnapshotError
    );
};

const handleCollectionReferenceSnapshot = (onData, collectionSnapshot) => {
  const data = collectionSnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
  onData(data);
};

const handleSnapshotError = error => {
  console.error("Firestore Error:");
  console.error(error);
};

const withFirestore = refs => WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        listeners: null,
        refs: typeof refs === "function" ? refs(this.props) : refs,
        data: {}
      };
    }
    componentWillMount() {
      if (Array.isArray(this.state.refs)) {
        const listeners = this.state.refs.map(refData =>
          firestoreSubscribe(
            refData.ref,
            this.handleFirestoreResult.bind(this, refData.name)
          )
        );
        this.setState({ listeners });
      } else {
        throw new Error("withFirestore Error: Refs needs to be an array.");
      }
    }
    componentWillUnmount() {
      this.state.listeners.forEach(listener => listener());
    }
    handleFirestoreResult(refName, firestoreData) {
      const refNames = this.state.refs.map(refData => refData.name);

      const loading = !refNames.every(currRefName => {
        return currRefName === refName || currRefName in this.state.data;
      });

      this.setState({
        data: {
          ...this.state.data,
          ...{
            [refName]: firestoreData
          }
        },
        loading
      });
    }
    render() {
      console.log(this.state);
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };

export default withFirestore;
