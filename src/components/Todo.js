import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const checkStatus = (status) => {
    if (status === "success") return true;
    else if (status === "in process") return false;
}

const Todo = ({ todo, setChangeTodoes, onDeleteTodo }) => {
    const [content, useContent] = useState("New Todo");
    const [isChecked, useIsChecked] = useState(false);
    useEffect(() => {
        useContent(todo.content);
    }, [todo.content])
    useEffect(() => {
        const todoIsChecked = checkStatus(todo.status);
        useIsChecked(todoIsChecked);
    }, [todo.status])
    return (
        <View style={styles.todo}>
            <CheckBox
                checked={checkStatus(todo.status)}
                onPress={() => {
                    setChangeTodoes(content, !isChecked);
                }}
                size={40}
            />
            <TextInput
                style={isChecked ? {...styles.TextInput, ...styles.todoSuccess} : {...styles.TextInput}}
                value={content}
                onChangeText={(text) => useContent(text)}
                onSubmitEditing={() => setChangeTodoes(content, isChecked)}
            />
            <TouchableOpacity
                style={styles.trash} 
                onPress={onDeleteTodo}>
                <Feather name="trash-2" size={25} color="red" /> 
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    todo: {
        backgroundColor: "white",
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 6
    },
    TextInput: {
        flex: 9,
        fontSize: 18
    },
    trash: {
        flex: 2,
        alignSelf: 'center',
    },
    todoSuccess: {
        textDecorationLine: "line-through"
    }
});

export default Todo;
