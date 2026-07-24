"use client"

import { selectIsAuthenticated } from "@/store/features/authSlice";
import { useCreateSkillUnderCategoryMutation, useGetSkillCategoriesGroupedQuery } from "@/store/features/portfolioApi";
import { useReducer } from "react";
import { useSelector } from "react-redux";


const initialState={
    isOpen:false,
    name:"",
    svgIcon:"",
    proficiency:0,
    displayOrder:1,
    categoryId:0,
    error:"",



};

type State= typeof initialState;
type Action=
    | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "SET"; field: keyof State; value: string | number }
  | { type: "SET_ERROR"; payload: string };

  function reducer (state :State , action:Action ):State{
    switch(action.type){
        case "OPEN":
        return {...state,isOpen:true};
        case "CLOSE":
        return {...state,isOpen:false};
        case "SET":
        return {...state, [action.field]: action.value};
        case "SET_ERROR":
        return {...state, error: action.payload};
        case "SET":
        return { ...state, [action.field]: action.value };

    }
  }

  export default function AddSkillModal() {
    const isAuthenticated =useSelector(selectIsAuthenticated);
    const [state,dispatch]=useReducer(reducer,initialState);

  const { data: categories } = useGetSkillCategoriesGroupedQuery(undefined);
    const [createSkill, { isLoading }] = useCreateSkillUnderCategoryMutation();
if (!isAuthenticated) return null;

  const handleSubmit = async () => {
    dispatch({ type: "SET_ERROR", payload: "" });

    if (!state.name || !state.svgIcon || !state.categoryId) {
      dispatch({ type: "SET_ERROR", payload: "Name, SVG and Category are required" });
      return;
    }

    try {
      await createSkill({
        categoryId: Number(state.categoryId),
        skill: {
          name: state.name,
          svgIcon: state.svgIcon,
          proficiency: Number(state.proficiency),
          displayOrder: Number(state.displayOrder),
        },
      }).unwrap();

      dispatch({ type: "CLOSE" });
    } catch (err: any) {
      dispatch({
        type: "SET_ERROR",
        payload: err?.data?.message || "Failed to add skill",
      });
    }
  };
  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={() => dispatch({ type: "OPEN" })}
        className="fixed bottom-6 right-6 z-40
                   px-4 py-2 rounded-xl
                   bg-purple-600 hover:bg-purple-500
                   text-white text-sm font-medium
                   shadow-[0_0_20px_rgba(139,92,246,0.4)]
                   transition-all duration-200
                   flex items-center gap-2"
      >
        <span className="text-lg">+</span> Add Skill
      </button>

      {/* ── Modal ── */}
      {state.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => dispatch({ type: "CLOSE" })}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* glass card */}
          <div
            className="relative z-10 w-full max-w-md mx-4 p-8 rounded-2xl
                       bg-white/5 backdrop-blur-xl
                       border border-white/10
                       shadow-[0_0_40px_rgba(139,92,246,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="text-center mb-6">
              <h2 className="text-white text-xl font-semibold">Add Skill</h2>
              <p className="text-white/40 text-sm mt-1">
                Fill in the details below
              </p>
            </div>

            <div className="space-y-4">

              {/* Category */}
              <div className="space-y-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={state.categoryId}
                  onChange={(e) =>
                    dispatch({ type: "SET", field: "categoryId", value: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl
                             bg-white/5 border border-white/10
                             text-white text-sm
                             focus:outline-none focus:border-purple-500/50
                             transition-colors duration-200"
                >
                  <option value="" className="bg-[#000319]">
                    Select a category
                  </option>
                  {categories?.map((cat: any) => (
                    <option key={cat.id} value={cat.id} className="bg-[#000319]">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spring Boot"
                  value={state.name}
                  onChange={(e) =>
                    dispatch({ type: "SET", field: "name", value: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl
                             bg-white/5 border border-white/10
                             text-white placeholder-white/30 text-sm
                             focus:outline-none focus:border-purple-500/50
                             transition-colors duration-200"
                />
              </div>

              {/* SVG Icon */}
              <div className="space-y-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">
                  SVG Icon
                </label>
                <textarea
                  placeholder="<svg xmlns='...' viewBox='0 0 24 24'>...</svg>"
                  value={state.svgIcon}
                  onChange={(e) =>
                    dispatch({ type: "SET", field: "svgIcon", value: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl
                             bg-white/5 border border-white/10
                             text-white placeholder-white/30 text-sm
                             focus:outline-none focus:border-purple-500/50
                             transition-colors duration-200
                             resize-none font-mono"
                />
                {/* live SVG preview */}
                {state.svgIcon && (
                  <div className="flex items-center gap-3 mt-2">
                    <div
                      className="w-8 h-8 text-white [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: state.svgIcon }}
                    />
                    <span className="text-white/40 text-xs">Preview</span>
                  </div>
                )}
              </div>

              {/* Proficiency + Display Order — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/50 text-xs uppercase tracking-wider">
                    Proficiency (1-100)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={state.proficiency}
                    onChange={(e) =>
                      dispatch({ type: "SET", field: "proficiency", value: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl
                               bg-white/5 border border-white/10
                               text-white text-sm
                               focus:outline-none focus:border-purple-500/50
                               transition-colors duration-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white/50 text-xs uppercase tracking-wider">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={state.displayOrder}
                    onChange={(e) =>
                      dispatch({ type: "SET", field: "displayOrder", value: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl
                               bg-white/5 border border-white/10
                               text-white text-sm
                               focus:outline-none focus:border-purple-500/50
                               transition-colors duration-200"
                  />
                </div>
              </div>

            </div>

            {/* error */}
            {state.error && (
              <p className="text-red-400 text-xs text-center mt-4">
                {state.error}
              </p>
            )}

            {/* submit */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-6 py-3 rounded-xl
                         bg-purple-600 hover:bg-purple-500
                         disabled:opacity-50 disabled:cursor-not-allowed
                         text-white text-sm font-medium
                         transition-colors duration-200
                         shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              {isLoading ? "Adding..." : "Add Skill"}
            </button>

            {/* close */}
            <button
              onClick={() => dispatch({ type: "CLOSE" })}
              className="absolute top-4 right-4
                         text-white/30 hover:text-white/70
                         transition-colors duration-200 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );


  }


    

