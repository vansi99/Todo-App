import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import Todo from '../components/Todo';
import { getTodoesApi, updateTodoApi, createTodoApi, deleteTodoApi } from '../api/TodoApi';

const TodoScreen = ({ navigation }) => {
    const [todoes, useTodoes] = useState([]);

    const resetTodoes = async () => {
        try {
            const todoesData = await getTodoesApi();
            useTodoes(todoesData);
        } catch (err) {
            console.log(err)
            alert("Reset Todo: ", err.message);
        }
    }

    const updateTodo = async (content, isChecked, todoId) => {
        try {
            const status = isChecked ? "success" : "in process";
            const res = await updateTodoApi(todoId, content, status);
            await resetTodoes();
        } catch (err) {
            alert("Update Todo: ", err.message);
        }
    }

    const createNewTodo = async () => {
        try {
            const res = await createTodoApi("New Todo", "in process");
            await resetTodoes();
        } catch (err) {
            alert("Create Todo: ", err.message)
        }
    }

    const deleteTodo = async (todoId) => {
        try {
            const res = await deleteTodoApi(todoId);
            await resetTodoes();
        } catch (err) {
            alert("Delete Todo: ", err.message)
        }
    }

    useEffect(() => {
        resetTodoes().then();
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={createNewTodo}
                >
                    <Feather
                        name="plus"
                        size={32}
                        style={styles.imageHeader}
                    />
                </TouchableOpacity>
            ),
        });
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={todoes}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                    return (
                        <Todo
                            todo={item}
                            setChangeTodoes={(content, isChecked) => {
                                updateTodo(content, isChecked, item._id)
                            }}
                            onDeleteTodo={() => {
                                deleteTodo(item._id)
                            }}
                        />)
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageHeader: {
        marginRight: 10,
    },
});

export default TodoScreen;
