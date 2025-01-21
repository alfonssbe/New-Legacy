"use client"

import * as z from "zod"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { News, News_Image } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import Image from "next/image"
import { uploadNewsImage } from "@/app/admin/upload-news-image"
import { Textarea } from "@/app/admin/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/app/admin/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/admin/components/ui/popover"
import { Bold, CalendarIcon, Heading1, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Strikethrough, Link as LinkLucide, Unlink as UnlinkLucide } from "lucide-react"
import { format } from "date-fns"
import { Toggle } from "@/app/admin/components/ui/toggle"
import { Heading2 } from "lucide-react"
import { Heading3 } from "lucide-react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import HeadingTiptap from '@tiptap/extension-heading';
import ImageTiptap from '@tiptap/extension-image';
import LinkTiptap from '@tiptap/extension-link'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import './styles.scss'


const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  link_url: z.string().optional(),
  link_placeholder: z.string().optional(),
  news_img: z.object({ url: z.string() }).array(),
  news_date: z.date().optional(),
});

type NewsFormValues = z.infer<typeof formSchema>

interface NewsFormProps {
  initialData: News & {
    news_img: News_Image[]
  } | null;
};

export const NewsForm: React.FC<NewsFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(new Date())
 
  const [newsImage, setNewsImage] = useState<News_Image>()
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const title = initialData ? 'Edit News' : 'Add News';
  const description_title = `Add or Change This News`;
  const toastMessage = initialData ? 'News updated.' : 'News added.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    title: '',
    description: '',
    link_url: '',
    link_placeholder: '',
    news_img: [],
    news_date: new Date(),
  }

  useEffect(() => {
  const fetchData = async () => {
    if (initialData && initialData.news_img.length>0) {
      setNewsImage(initialData.news_img[0]);
    }
    else{
      let temp: News_Image = {
        id: Math.random().toString(),
        //@ts-ignore
        productId: params.newsId,
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setNewsImage(temp)
    }
    if(initialData && initialData.event_date) {
      setDate(initialData.event_date)
    }
    else{
      setDate(new Date())
    }
  };
  
  fetchData().catch((error) => {
    console.error("Error fetching news: ", error);
  });
  }, [params.newsId, initialData, initialData?.news_img]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  const deleteImage = async () => {
    let temp: News_Image = {
      id: '',
      //@ts-ignore
      productId: params.newsId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setNewsImage(temp)
  };

  async function handleImageUpload (file: File): Promise<News_Image> {
    if (file) {
      let updatednewsImage = newsImage;
      try {
        const formData = new FormData();
        formData.append('image', file);

        const url = await uploadNewsImage(formData);
        updatednewsImage!.url = url
        return updatednewsImage!;
        } catch (error) {
        console.error("Error uploading news image:", error);
        let temp: News_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.newsId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        return temp;
      }
    }
    let temp: News_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.newsId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  };


  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: NewsFormValues) => {
    try {
      setLoading(true);

      if (selectedFile) {
        data.news_img[0] = await handleImageUpload(selectedFile);
      }
      else{
        data.news_img[0] = newsImage!
      }

      if(date){
      data.news_date = date
      }
      else{
        data.news_date = new Date()
      }

      if(editor && editor.getHTML()){
        data.description = editor.getHTML()
      }
      else{
        data.description = ''
      }

      const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_ADD_NEWS}`;
      //@ts-ignore
      const API_EDITED = API.replace('{brandId}', params.brandId)
      //@ts-ignore
      const API_EDITED2 = API_EDITED.replace('{newsId}', params.newsId)
      const response = await axios.patch(API_EDITED2, data);
      if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Session expired, please login again");
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again");
      }
      else if(response.data === 'unauthorized'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Unauthorized!");
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/news`);
        router.refresh();
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };



    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit,
        HeadingTiptap.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        ImageTiptap,
        BulletList,
        OrderedList,
        LinkTiptap.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url: string, ctx:any) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
  
              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false
              }
  
              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto']
              const protocol = parsedUrl.protocol.replace(':', '')
  
              if (disallowedProtocols.includes(protocol)) {
                return false
              }
  
              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map((p: string | { scheme: string }) => (typeof p === 'string' ? p : p.scheme))
  
              if (!allowedProtocols.includes(protocol)) {
                return false
              }
  
              // disallowed domains
              const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
              const domain = parsedUrl.hostname
  
              if (disallowedDomains.includes(domain)) {
                return false
              }
  
              // all checks have passed
              return true
            } catch (error) {
              return false
            }
          },
          shouldAutoLink: url => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
  
              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
              const domain = parsedUrl.hostname
  
              return !disallowedDomains.includes(domain)
            } catch (error) {
              return false
            }
          },
  
        }),
      ],
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
        },
      },
      content: initialData?.description ? initialData.description : '<p>Start editing...</p>',
    });
  
    
  
    const setLink = useCallback(() => {
      const previousUrl = editor!.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
  
      // cancelled
      if (url === null) {
        return
      }
  
      // empty
      if (url === '') {
        editor!.chain().focus().extendMarkRange('link').unsetLink()
          .run()
  
        return
      }
  
      // update link
      editor!.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()
    }, [editor])
  
  
    const addImage = useCallback((url: string) => {
      // const url = window.prompt('URL')
  
      if (url) {
        editor!.chain().focus().setImage({ src: url }).run()
      }
    }, [editor])
  
  
    
     async function handleImageUploadContentNews (file: File): Promise<string> {
        if (file) {
          try {
            const formData = new FormData();
            formData.append('image', file);
    
            const url = await uploadNewsImage(formData);
            return url
            } catch (error) {
              return ''
          }
        }
        return '';
      };
  
  
      if (!editor) {
        return null
      }
  
  
    const handleFileChangeTiptap = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        let testUrl = await handleImageUploadContentNews(e.target.files?.[0]);
        addImage(testUrl)
      }
    };


 
    if (!editor) {
      return null
    }
  

  return (  
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description_title} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="space-y-2">
            <div
              className="flex items-center justify-between rounded-md shadow-sm"
            >
              <div className="flex items-center space-x-4">
                {newsImage && newsImage.url !== '' && (
                  <Image alt={title} src={newsImage.url} width={200} height={200} className="w-52 h-fit" priority/>
                )}
                <Input
                  id={`file`}
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={(e) =>
                    e.target.files && handleFileChange(e) // Ensure your file upload function can handle image files
                  }
                  disabled={loading}
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              {newsImage && newsImage.url !== '' && (
                <div
                  className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                  onClick={() => deleteImage()}
                >
                  Delete Image
                </div>
              )}
            </div>
          </div>
           <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="News Title" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className=" hidden">
                  <FormLabel>Content (HTML format)</FormLabel>
                  <FormControl>
                    <Textarea disabled={loading} placeholder="Enter news content in HTML format" className="min-h-[200px]" {...field} value={'-'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="link_url"
              render={({ field }) => (
                <FormItem className=" hidden">
                  <FormLabel>Link URL</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Enter Link Here" {...field} value={'-'}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="link_placeholder"
              render={({ field }) => (
                <FormItem className=" hidden">
                  <FormLabel>Placeholder For Your Link</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Add a Placeholder For Your Link" {...field} value={'-'}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Label className="block p-0">Publication Date</Label>
            <Popover>
              <PopoverTrigger asChild className="flex">
                <Button
                  variant={"outline"}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>


            <div>
              {/* Toolbar */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <Toggle
                  pressed={editor.isActive('bold')}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={editor.isActive('italic')}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={editor.isActive('strike')}
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <Strikethrough className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={editor.isActive('bulletList')}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={editor.isActive('orderedList')}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered className="w-4 h-4" />
                </Toggle>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <Toggle
                    key={level}
                    pressed={editor.isActive('heading', { level })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
                  >
                    {level === 1 && <Heading1 className="w-4 h-4" />}
                    {level === 2 && <Heading2 className="w-4 h-4" />}
                    {level === 3 && <Heading3 className="w-4 h-4" />}
                    {level === 4 && <Heading4 className="w-4 h-4" />}
                    {level === 5 && <Heading5 className="w-4 h-4" />}
                    {level === 6 && <Heading6 className="w-4 h-4" />}
                  </Toggle>
                ))}
                 
                 <Toggle
                  pressed={editor.isActive('link')}
                  onClick={setLink}
                >
                    <LinkLucide className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={!editor.isActive('link')}
                  onClick={() => editor.chain().focus().unsetLink().run()}
                >
                    <UnlinkLucide className="w-4 h-4" />
                </Toggle>
              </div>
                
                <Input  
                  id={`file`}
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={(e) =>
                    e.target.files && handleFileChangeTiptap(e)
                  }
                  className="border border-gray-300 p-2 rounded-md"
                />

              <EditorContent editor={editor} className="border p-4"/>
            </div>


          <Button disabled={loading} className="ml-auto" type="submit" variant={'secondary'}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

