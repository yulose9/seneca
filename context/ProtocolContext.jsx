import React, { createContext, useContext, useState } from 'react';

/**
 * Protocol Context
 * Shared state for Morning Ignition tasks across screens
 * Allows Home screen to display real-time protocol progress
 */

const defaultTasks = [
    { id: 1, title: 'Wake at 5:00 AM', done: false },
    { id: 2, title: 'Cold Shower', done: false },
    { id: 3, title: 'Meditation (10 min)', done: false },
    { id: 4, title: 'Review Goals', done: false },
    { id: 5, title: 'First Deep Work Block', done: false },
];

const ProtocolContext = createContext(null);

export function ProtocolProvider({ children }) {
    const [tasks, setTasks] = useState(defaultTasks);

    // Toggle a task's completion status
    const toggleTask = (id) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        ));
    };

    // Reset all tasks (for a new day)
    const resetTasks = () => {
        setTasks(defaultTasks.map(t => ({ ...t, done: false })));
    };

    // Computed values
    const completedCount = tasks.filter(t => t.done).length;
    const totalCount = tasks.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    const isComplete = completedCount === totalCount;

    const value = {
        tasks,
        toggleTask,
        resetTasks,
        completedCount,
        totalCount,
        progress,
        isComplete,
    };

    return (
        <ProtocolContext.Provider value={value}>
            {children}
        </ProtocolContext.Provider>
    );
}

export function useProtocol() {
    const context = useContext(ProtocolContext);
    if (!context) {
        throw new Error('useProtocol must be used within a ProtocolProvider');
    }
    return context;
}
