import firebase from 'firebase/app'
import 'firebase/firestore'

const database = app.firestore()

export function firebaseCRUD(collection, document) {
    function getObject() {
        const subscriber = app.firestore()
            .collection('objects')
            .doc('ajzleVfsL2D454NRmGfn')
            .onSnapshot(documentSnapshot => {
                setTestStuff(...testStuff, documentSnapshot.data())
            })

        return () => subscriber();
    }
    const value = {}
}