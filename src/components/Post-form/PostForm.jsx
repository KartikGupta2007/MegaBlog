import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../AppWrite/Services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues:{
            title: post?.Title || "",
            slug: post?.$id || "",
            content: post?.Content || "",
            status: post?.Status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
            if (file) {
                data.featuredImage = file.$id;
            }
            const dbPost = await service.updatePost({ ...data, userId: userData.$id });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadFile(data.image[0]) || { $id: null };
            // console.log(file);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                // console.log(data);
                const dbPost = await service.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (!post && name === "title" ) {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    disabled = {post}
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.previewFile(post.FeaturedImage)}
                            alt={post.Title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Input
                    label ={(post) ? "Update Image" : "Featured Image :"}
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                <div className="mb-4">
                    <label className="block mb-1 font-normal">Status :</label>
                    <Select
                        options={["active", "inactive"]}
                        {...register("status", { required: true })}
                    />
                </div>
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}